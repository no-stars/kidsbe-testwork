import { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { ApiResponse, Code } from '@kidsbe/common'
import { AuthenticationResponseBody } from '@kidsbe/communication'

import { AuthenticationUseCase } from '../usecases/authentication.usecase'
import { AuthenticationUseCaseAdapter } from '../adapters/authentication-usecase.adapter'


@injectable()
export class AdminController {

  constructor(@inject(Token.AuthenticationUseCase) private readonly authenticationUseCase: AuthenticationUseCase) {}

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const adapter = new AuthenticationUseCaseAdapter({ userId: req.body.userId })
      const response: AuthenticationResponseBody = await this.authenticationUseCase.execute(adapter)

      res.status(Code.CREATED.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

}
