import { UserDtoType, ProfileDtoType } from '../auth/register.dto'
import { Profile } from '@prisma/client'

export interface UserInterface {
  user: UserDtoType
  profile: ProfileDtoType
}

export type UserResponse = { email: string } & Profile
