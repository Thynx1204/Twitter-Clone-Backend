import express, { type Application } from 'express'
import cors, { type CorsRequest } from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import Controller from './interfaces/controller.interface'
import logger from './utils/logger'

class App {
  public express: Application
  public port: number

  constructor(controllers: Controller[], port: number) {
    this.express = express()
    this.port = port
    this.initializeMiddleware()
    this.initializeControllers(controllers)
  }

  private readonly initializeMiddleware = (): void => {
    this.express.use(
      cors<CorsRequest>({
        origin: '*'
      })
    )
    this.express.use(compression())
    this.express.use(helmet())
    this.express.use(morgan('dev'))
    this.express.use(express.json({ limit: '50mb' }))
    this.express.use(express.urlencoded({ extended: true }))
  }

  private readonly initializeControllers = (controllers: Controller[]): void => {
    controllers.forEach((controller) => {
      this.express.use(controller.path, controller.router)
    })
  }

  public listen = (): void => {
    this.express.listen(this.port, () => {
      logger.info(`Server listening on PORT ${this.port} 🚀`)
    })
  }
}

export default App
