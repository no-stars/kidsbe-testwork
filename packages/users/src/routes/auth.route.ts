import { Router } from 'express'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { AuthController } from '../controllers/auth.controller'
import { Route, ValidationMiddleware } from '@kidsbe/common'
import { SignInRequestBody, SignUpRequestBody, VerifyRequestBody } from '@kidsbe/communication'


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

    this.router.post(
      `${this.path}/verify`,
      ValidationMiddleware(VerifyRequestBody),
      this.authController.verify.bind(this.authController)
    )
  }

}
