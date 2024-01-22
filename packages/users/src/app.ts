import 'reflect-metadata'
import './config/expose-env'

import express from 'express'

import { AppConfig } from './config'
import { container } from './config/inversify.config'
import { Token } from './config/di'

import { Route, ErrorMiddleware } from '@kidsbe/common'
import { AuthRoute } from './routes/auth.route'


export class App {

  private readonly app: express.Application
  private readonly env: string
  private readonly port: string | number
  private readonly basePath: string

  constructor() {
    this.app = express()
    this.env = AppConfig.NODE_ENV
    this.port = AppConfig.APP_PORT
    this.basePath = AppConfig.APP_BASE_PATH

    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`[server]: Server is running at http://localhost:${this.port}`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(express.json())
  }

  private initializeRoutes() {
    const routes: Route[] = [
      container.get<AuthRoute>(Token.AuthRoute),
    ]

    for (const route of routes) {
      this.app.use(this.basePath, route.router)
    }
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware)
  }

}

