import { inject, injectable } from 'inversify'
import { Token } from '../config/di'
import { Article } from '../article/article.entity'
import { ArticlesRepositoryPort } from '../repositories/articles.port'
import { EditArticleUseCaseAdapter } from '../adapters/edit-article-usecase.adapter'
import { AdminsClient } from '@kidsbe/communication'
import { Exception, Code } from '@kidsbe/common'


@injectable()
export class EditArticleUseCase {

  constructor(
    @inject(Token.PgArticleRepository) private readonly articleRepository: ArticlesRepositoryPort,
    @inject(Token.AdminsHttpClient) private readonly adminsClient: AdminsClient
  ) {}

  public async execute(payload: EditArticleUseCaseAdapter): Promise<Article> {
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
        overrideMessage: 'You can not edit this article',
      })
    }

    existArticle.edit({
      title: payload.title,
      content: payload.content,
      modifiedBy: payload.userId,
    })

    const article: Article = await this.articleRepository.updateArticle(payload.articleId, existArticle)

    return article
  }

}
