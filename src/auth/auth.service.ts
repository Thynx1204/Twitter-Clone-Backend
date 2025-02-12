import userModel from '../repositories/user.repository'
import { User } from '@prisma/client'

class AuthService {
  public async emailExist(email: string): Promise<boolean> {
    const user: User | null = await userModel.findFirst({
      where: {
        email: email
      }
    })

    return !!user
  }
}

export default AuthService
