import { UserDtoType } from '../auth/register.dto'
import { Profile } from '@prisma/client'

export interface UserInterface {
  user: UserDtoType
}

export type UserResponse = { email: string } & Profile
