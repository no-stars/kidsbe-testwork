import { QueryResult } from 'pg'
import { inject, injectable } from 'inversify'
import { Token } from '../config/di'
import { PostgresClient } from '../config/db-connection'
import { Article } from '../article/article.entity'
import { ArticlesRepositoryPort } from './articles.port'


@injectable()
export class PgArticleRepository implements ArticlesRepositoryPort {

  constructor(@inject(Token.PostgresClient) private readonly postgresClient: PostgresClient) {}

  public async addArticle(article: Article): Promise<Article> {
    const queryText
      = `INSERT INTO articles
         (article_id, title, content, author_id, modified_by, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const values = toPgValues(article)

    await this.postgresClient.query(queryText, values)

    return article
  }

  public async findArticle(by: { articleId: string }): Promise<Article | null> {
    const values = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT article_id, title, content, author_id, modified_by, created_at, updated_at
         FROM articles`

    if (by.articleId) {
      whereConditions.push(`article_id = $${values.length + 1}`)
      values.push(by.articleId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    const result: QueryResult = await this.postgresClient.query(queryText, values)
    const articles: Article[] = toDomainEntities(result)

    return articles?.[0] || null
  }

  public async findArticleList(): Promise<Article[]> {
    const queryText
      = `SELECT article_id, title, content, author_id, modified_by, created_at, updated_at
         FROM articles`

    const result: QueryResult = await this.postgresClient.query(queryText, [])
    const articles: Article[] = toDomainEntities(result)

    return articles
  }

  public async updateArticle(articleId: string, article: Article): Promise<Article> {
    const queryText
      = `UPDATE articles
         SET title = $2, content = $3, author_id = $4, modified_by = $5, created_at = $6, updated_at = $7
         WHERE article_id = $1;`

    const values = [articleId].concat(toPgValues(article).slice(1))

    await this.postgresClient.query(queryText, values)

    return article
  }

  public async deleteArticle(articleId: string): Promise<boolean> {
    const queryText = 'DELETE FROM articles WHERE article_id = $1;'
    const values = [articleId]

    const result: QueryResult = await this.postgresClient.query(queryText, values)
    const isDeleted: boolean = !!result.rowCount

    return isDeleted
  }

}


function toDomainEntities(result: QueryResult): Article[] {
  const articles: Article[] = []

  for (const articleData of result.rows) {
    const article = new Article({
      id: articleData.article_id,
      title: articleData.title,
      content: articleData.content,
      authorId: articleData.author_id,
      modifiedBy: articleData.modified_by,
      createdAt: articleData.created_at,
      updatedAt: articleData.updated_at,
    })

    articles.push(article)
  }

  return articles
}

function toPgValues(article: Article): any[] {
  return [
    article.getId(),
    article.getTitle(),
    article.getContent(),
    article.getAuthorId(),
    article.getModifiedBy(),
    article.getCreatedAt(),
    article.getUpdatedAt(),
  ]
}
