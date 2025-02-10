import { z } from 'zod'

const UserDto = z.object({
  email: z.string().email('Invalid email format.').trim(),
  username: z
    .string()
    .trim()
    .min(3, 'Username must have at least 3 characters.')
    .max(30, 'Username must be at most 30 characters'),
  password: z
    .string()
    .min(8, 'Password should have at least 8 characters.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      'Password must contain at least one letter, one number, and one special character.'
    )
})

type UserDtoType = z.infer<typeof UserDto>

const ProfileDto = z.object({
  name: z.string().trim().min(3, 'Name must have at least 3 characters.'),
  dob: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
    .transform((date) => new Date(date))
})

type ProfileDtoType = z.infer<typeof ProfileDto>

export { UserDto, UserDtoType, ProfileDto, ProfileDtoType }
