import { CreateArticleRequestBody } from './api/request/create-article-request-body'
import { EditArticleRequestBody } from './api/request/edit-article-request-body'
import { ArticleListResponse } from './api/response/article-list-response'
import { ArticleResponse } from './api/response/article-response'
import { EditArticleRequestParams } from './api/request/edit-article-request-params'
import { RemoveArticleRequestParams } from './api/request/remove-article-request-params'


export interface ArticlesClient {
  list(): Promise<ArticleListResponse>
  // create(body: CreateArticleRequestBody): Promise<ArticleResponse>
  // edit(params: EditArticleRequestParams, body: EditArticleRequestBody): Promise<ArticleResponse>
  // remove(params: RemoveArticleRequestParams): Promise<boolean>
}
