import { CreateArticleRequestBody } from './api/request/create-article-request-body'
import { EditArticleRequestBody } from './api/request/edit-article-request-body'
import { EditArticleRequestParams } from './api/request/edit-article-request-params'
import { RemoveArticleRequestParams } from './api/request/remove-article-request-params'
import { RequestUserIdHeader } from '../common'


export interface ArticlesClient {
  list(): Promise<any>
  create(body: CreateArticleRequestBody, headers: RequestUserIdHeader): Promise<any>
  edit(params: EditArticleRequestParams, body: EditArticleRequestBody, headers: RequestUserIdHeader): Promise<any>
  remove(params: RemoveArticleRequestParams, headers: RequestUserIdHeader): Promise<any>
}
