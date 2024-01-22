import { Article } from '../article/article.entity'


export interface ArticlesRepositoryPort {
  addArticle(article: Article): Promise<Article>
  findArticle(by: { articleId: string }): Promise<Article | null>
  findArticleList(): Promise<Article[]>
  updateArticle(articleId: string, article: Article): Promise<Article>
  deleteArticle(articleId: string): Promise<boolean>
}
