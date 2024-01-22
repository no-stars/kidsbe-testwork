import { inject, injectable } from 'inversify'
import { Token } from '../config/di'
import { Article } from '../article/article.entity'
import { ArticlesRepositoryPort } from '../repositories/articles.port'
import { RemoveArticleUseCaseAdapter } from '../adapters/remove-article-usecase.adapter'
import { Code, Exception } from '@kidsbe/common'
import { AdminsClient } from '@kidsbe/communication'


@injectable()
export class RemoveArticleUseCase {

  constructor(
    @inject(Token.PgArticleRepository) private readonly articleRepository: ArticlesRepositoryPort,
    @inject(Token.AdminsHttpClient) private readonly adminsClient: AdminsClient
  ) {}

  public async execute(payload: RemoveArticleUseCaseAdapter): Promise<boolean> {
    const existArticle: Article | null = await this.articleRepository.findArticle({ articleId: payload.articleId })

    if (!existArticle) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Article does not exist',
      })
    }

    const belongsToUser: boolean = existArticle.getAuthorId() === payload.userId
    let hasAccess: boolean = belongsToUser

    if (!hasAccess) {
      const response = await this.adminsClient.authenticate({ userId: payload.userId }) as any
      const isAdmin: boolean = response.data.authenticated
      hasAccess = isAdmin
    }

    if (!hasAccess) {
      throw Exception.new({
        code: Code.ACCESS_DENIED_ERROR,
        overrideMessage: 'You can not delete this article',
      })
    }

    const isDeleted: boolean = await this.articleRepository.deleteArticle(payload.articleId)

    return isDeleted
  }

}
