import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt.util'
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import jsonResponse from '../utils/jsonResponse'

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const auth = request.headers.authorization
  let token: string

  if (!auth || !auth.startsWith('Bearer ')) {
    response.status(403).json(jsonResponse('No token provided.', false))
    return
  }

  token = auth.split(' ')[1]

  if (!token) {
    response.status(401).json(jsonResponse('Token missing.', false))
    return
  }

  try {
    let payload: JwtPayload = verifyAccessToken(token) as JwtPayload
    // @ts-ignore
    request.user = payload.sub
    return next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      response
        .status(403)
        .json(
          jsonResponse(
            error.name === 'TokenExpiredError' ? 'Token expired.' : 'Token malformed.',
            false
          )
        )
      return
    } else if (error instanceof Error) {
      response.status(500).json(jsonResponse('An unexpected error occurred.', false))
      return
    }
  }
}
