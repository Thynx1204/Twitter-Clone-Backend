export class EmailExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists.`)
  }
}
