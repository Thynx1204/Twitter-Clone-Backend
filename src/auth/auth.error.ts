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

export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found.`)
  }
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super('Incorrect password!')
  }
}
