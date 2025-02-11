export class EmailExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists.`)
  }
}

export class UsernameExistsError extends Error {
  constructor(username: string) {
    super(`User with username ${username} already exists.`)
  }
}
