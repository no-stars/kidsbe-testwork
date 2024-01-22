import { inject, injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'

import { Token } from '../config/di'
import {
  SignInResponseBody,
  SignUpResponseBody,
  VerifyResponseBody,
} from '@kidsbe/communication'
import { ApiResponse, Code } from '@kidsbe/common'
import { SignInUseCase } from '../use-cases/sign-in.usecase'
import { SignUpUseCase } from '../use-cases/sign-up.usecase'
import { VerifyUseCase } from '../use-cases/verify.usecase'
import { SignInUseCaseAdapter } from '../adapters/sign-in-usecase.adapter'
import { SignUpUseCaseAdapter } from '../adapters/sign-up-usecase.adapter'
import { VerifyUsecaseAdapter } from '../adapters/verify-usecase.adapter'


@injectable()
export class AuthController {

  constructor(
    @inject(Token.SignInUseCase) private readonly signInUseCase: SignInUseCase,
    @inject(Token.SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
    @inject(Token.VerifyUseCase) private readonly verifyUseCase: VerifyUseCase
  ) {}

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const adapter = new SignInUseCaseAdapter(req.body)
      const response: SignInResponseBody = await this.signInUseCase.execute(adapter)

      res.status(Code.CREATED.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const adapter = new SignUpUseCaseAdapter(req.body)
      const response: SignUpResponseBody = await this.signUpUseCase.execute(adapter)

      res.status(Code.CREATED.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const adapter = new VerifyUsecaseAdapter(req.body)
      const response: VerifyResponseBody = await this.verifyUseCase.execute(adapter)

      res.status(Code.CREATED.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

}
