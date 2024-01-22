import { inject, injectable } from 'inversify'
import { Token } from '../config/di'
import { Article } from '../article/article.entity'
import { ArticlesRepositoryPort } from '../repositories/articles.port'
import { CreateArticleUsecaseAdapter } from '../adapters/create-article-usecase.adapter'


@injectable()
export class CreateArticleUseCase {

  constructor(@inject(Token.PgArticleRepository) private readonly articleRepository: ArticlesRepositoryPort) {}

  public async execute(payload: CreateArticleUsecaseAdapter): Promise<Article> {
    const article = Article.new({
      title: payload.title,
      content: payload.content,
      authorId: payload.userId,
    })
    const addedArticle: Article = await this.articleRepository.addArticle(article)

    return addedArticle
  }

}
