import { injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import { UsersHttpClient } from '@kidsbe/communication'


@injectable()
export class AuthController {

  private readonly client = new UsersHttpClient()

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.client.signIn(req.body)

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.client.signUp(req.body)

      res.status(200).json(response)
    } catch (error) {
      // next(error)
      throw error
    }
  }

}
