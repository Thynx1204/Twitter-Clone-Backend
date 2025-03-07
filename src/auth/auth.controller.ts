import Controller from '../interfaces/controller.interface'
import { Router } from 'express'
import type { Request, Response } from 'express'
import AuthService from './auth.service'
import jsonResponse from '../utils/jsonResponse'
import { UserInterface, UserResponse } from '../types/user'
import {
  EmailExistsError,
  UsernameExistsError,
  IncorrectPasswordError,
  UserNotFoundError
} from './auth.error'
import { ZodError } from 'zod'
import logger from '../utils/logger'

class AuthController implements Controller {
  public path = '/auth'
  public router = Router()
  private readonly authService = new AuthService()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.register)
    this.router.post('/login', this.login)
  }

  public register = async (request: Request, response: Response) => {
    const payload: UserInterface = request.body
    let userResponse: UserResponse

    try {
      userResponse = await this.authService.register(payload)
      response.status(201).json(jsonResponse('Successfully registered.', true, userResponse))
    } catch (error) {
      if (error instanceof UsernameExistsError || error instanceof EmailExistsError) {
        response.status(400).json(jsonResponse(error.message, false))
        return
      } else if (error instanceof ZodError) {
        const errorPayload = error.errors.map((error) => {
          return {
            field: error.path[0],
            message: error.message,
            code: error.code
          }
        })

        response.status(400).json(jsonResponse(errorPayload[0].message, false))
      } else {
        const e = error as Error
        response.status(500).json(jsonResponse('An unexpected error occurs.', false))
        logger.error(e.message)
        return
      }
    }
  }

  public login = async (request: Request, response: Response) => {
    const payload: { email: string; password: string } = request.body
    let token: string

    try {
      token = await this.authService.login(payload)

      response.status(200).json(jsonResponse('Successfully authenticated.', true, token))
    } catch (error) {
      if (error instanceof IncorrectPasswordError) {
        response.status(403).json(jsonResponse('Incorrect password.', false))
        return
      } else if (error instanceof UserNotFoundError) {
        response.status(404).json(jsonResponse('User not found.', false))
        return
      } else {
        const e = error as Error
        response.status(500).json(jsonResponse('An unexpected error occurs.', false))
        return
      }
    }
  }
}

export default AuthController
