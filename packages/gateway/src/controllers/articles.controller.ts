import { injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'
import { ArticlesHttpClient } from '@kidsbe/communication'
import { AuthorizedRequest } from '@kidsbe/common'


@injectable()
export class ArticlesController {

  private readonly client = new ArticlesHttpClient()

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.client.list()

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request & AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId ?? ''
      const response = await this.client.create(
        req.body,
        { 'request-user-id': userId }
      )

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async edit(req: Request & AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId ?? ''
      const id = req.params.id ?? ''
      const response = await this.client.edit(
        { id },
        req.body,
        { 'request-user-id': userId }
      )

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async remove(req: Request & AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId ?? ''
      const id = req.params.id ?? ''
      const response = await this.client.remove(
        { id },
        { 'request-user-id': userId }
      )

      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

}
