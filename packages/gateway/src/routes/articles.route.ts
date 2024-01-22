import { Router } from 'express'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { Route, ValidationMiddleware } from '@kidsbe/common'
import { CreateArticleRequestBody, EditArticleRequestBody } from '@kidsbe/communication'
import { ArticlesController } from '../controllers/articles.controller'
import { AuthMiddleware } from '../middleware/auth.middleware'


@injectable()
export class ArticlesRoute implements Route {

  public readonly router = Router()
  public readonly path = '/articles'

  constructor(
    @inject(Token.ArticlesController) private readonly articlesController: ArticlesController
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/`,
      this.articlesController.list.bind(this.articlesController)
    )

    this.router.post(
      `${this.path}/`,
      AuthMiddleware,
      ValidationMiddleware(CreateArticleRequestBody),
      this.articlesController.create.bind(this.articlesController)
    )

    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(EditArticleRequestBody),
      this.articlesController.edit.bind(this.articlesController)
    )

    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.articlesController.remove.bind(this.articlesController)
    )
  }

}
