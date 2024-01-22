import { Router } from 'express'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { Route, ValidationMiddleware } from '@kidsbe/common'
import { AuthenticationRequestBody } from '@kidsbe/communication'
import { AdminController } from '../controllers/admin.controller'


@injectable()
export class AdminRoute implements Route {

  public readonly router = Router()
  public readonly path = '/admin'

  constructor(
    @inject(Token.AdminController) private readonly adminController: AdminController
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/authentication`,
      ValidationMiddleware(AuthenticationRequestBody),
      this.adminController.authenticate.bind(this.adminController)
    )
  }

}
