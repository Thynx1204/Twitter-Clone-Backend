import { UserDtoType, ProfileDtoType } from '../auth/register.dto'
import { Profile } from '@prisma/client'

export type User = UserDtoType & ProfileDtoType

export type UserResponse = { email: string } & Profile
