import 'dotenv/config'
import validateEnv, { DEFAULT_ENV } from './utils/validateEnv'
import App from './app'
import AuthController from './auth/auth.controller'

validateEnv()

const app = new App([new AuthController()], Number(process.env.PORT ?? DEFAULT_ENV.PORT))
app.listen()
