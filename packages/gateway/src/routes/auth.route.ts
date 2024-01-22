import { Router } from 'express'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { Route, ValidationMiddleware } from '@kidsbe/common'
import { SignInRequestBody, SignUpRequestBody } from '@kidsbe/communication'
import { AuthController } from '../controllers/auth.controller'


@injectable()
export class AuthRoute implements Route {

  public readonly router = Router()
  public readonly path = '/auth'

  constructor(
    @inject(Token.AuthController) private readonly authController: AuthController
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/sign_in`,
      ValidationMiddleware(SignInRequestBody),
      this.authController.signIn.bind(this.authController)
    )

    this.router.post(
      `${this.path}/sign_up`,
      ValidationMiddleware(SignUpRequestBody),
      this.authController.signUp.bind(this.authController)
    )
  }

}
