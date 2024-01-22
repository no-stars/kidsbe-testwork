import { inject, injectable } from 'inversify'
import { NextFunction, Request, Response } from 'express'

import { Token } from '../config/di'
import { ApiResponse, Code } from '@kidsbe/common'
import {
  ArticleModel,
} from '@kidsbe/communication'

import { CreateArticleUseCase } from '../use-cases/create-article.usecase'
import { EditArticleUseCase } from '../use-cases/edit-article.usecase'
import { GetArticleListUseCase } from '../use-cases/get-article-list.usecase'
import { RemoveArticleUseCase } from '../use-cases/remove-article.usecase'
import { CreateArticleUsecaseAdapter } from '../adapters/create-article-usecase.adapter'
import { EditArticleUseCaseAdapter } from '../adapters/edit-article-usecase.adapter'
import { RemoveArticleUseCaseAdapter } from '../adapters/remove-article-usecase.adapter'


@injectable()
export class ArticlesController {

  constructor(
    @inject(Token.CreateArticleUseCase) private readonly createArticleUseCase: CreateArticleUseCase,
    @inject(Token.EditArticleUseCase) private readonly editArticleUseCase: EditArticleUseCase,
    @inject(Token.GetArticleListUseCase) private readonly getArticleListUseCase: GetArticleListUseCase,
    @inject(Token.RemoveArticleUseCase) private readonly removeArticleUseCase: RemoveArticleUseCase
  ) {}

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response: any[] = await this.getArticleListUseCase.execute()

      res.status(Code.SUCCESS.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const adapter = new CreateArticleUsecaseAdapter(req.body, req.headers['request-user-id'])
      const response: any = await this.createArticleUseCase.execute(adapter)

      res.status(Code.CREATED.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

  public async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const adapter = new EditArticleUseCaseAdapter(
        req.body,
        req.params.id,
        req.headers['request-user-id']
      )
      const response: any = await this.editArticleUseCase.execute(adapter)

      res.status(Code.SUCCESS.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adapter = new RemoveArticleUseCaseAdapter(req.params.id, req.headers['request-user-id'])
      const response: any = await this.removeArticleUseCase.execute(adapter)

      res.status(Code.SUCCESS.code).json(ApiResponse.success(response))
    } catch (error) {
      next(error)
    }
  }

}
