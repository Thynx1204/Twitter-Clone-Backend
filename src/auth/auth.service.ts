import userModel from '../repositories/user.repository'
import { User } from '@prisma/client'
import { UserInterface, UserResponse } from '../types/user'
import { UserDto } from './register.dto'
import {
  EmailExistsError,
  UsernameExistsError,
  UserNotFoundError,
  IncorrectPasswordError
} from './auth.error'
import { hashPassword } from '../utils/password.util'
import { format } from 'date-fns'
import { comparePassword } from '../utils/password.util'
import { generateAccessToken } from '../utils/jwt.util'
class AuthService {
  public async emailExist(email: string): Promise<boolean> {
    const user: User | null = await userModel.findFirst({
      where: {
        email: email
      }
    })

    return !!user
  }

  public async usernameExist(username: string): Promise<boolean> {
    const user: User | null = await userModel.findFirst({
      where: {
        username: username
      }
    })

    return !!user
  }

  public async register(payload: UserInterface): Promise<UserResponse> {
    UserDto.parse(payload.user)

    if (await this.emailExist(payload.user.email)) {
      throw new EmailExistsError(payload.user.email)
    }

    if (await this.usernameExist(payload.user.username)) {
      throw new UsernameExistsError(payload.user.username)
    }

    payload.user.password = await hashPassword(payload.user.password)
    const data = await userModel.create({
      data: {
        ...payload.user,
        profile: {
          create: {
            name: payload.user.profile.name,
            dob: format(new Date(payload.user.profile.dob), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
          }
        }
      },
      include: {
        profile: true
      }
    })

    return {
      ...data.profile!,
      email: data.email
    }
  }

  async login(payload: { email: string; password: string }) {
    const user: User | null = await userModel.findFirst({
      where: {
        email: payload.email
      }
    })

    if (!user) throw new UserNotFoundError(payload.email)

    if (await comparePassword(payload.password, user.password)) {
      return generateAccessToken(user.id)
    } else {
      throw new IncorrectPasswordError()
    }
  }
}

export default AuthService
