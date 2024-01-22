import { inject, injectable } from 'inversify'
import { Token } from '../config/di'
import { Article } from '../article/article.entity'
import { ArticlesRepositoryPort } from '../repositories/articles.port'


@injectable()
export class GetArticleListUseCase {

  constructor(@inject(Token.PgArticleRepository) private readonly articleRepository: ArticlesRepositoryPort) {}

  public async execute(): Promise<Article[]> {
    const articles: Article[] = await this.articleRepository.findArticleList()

    return articles
  }

}
