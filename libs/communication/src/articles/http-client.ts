import { injectable } from 'inversify'
import axios, { AxiosResponse, AxiosHeaders } from 'axios'
import { ArticlesClient } from './articles.client'
import {
  ArticleModel,
  ArticleListResponse,
  CreateArticleRequestBody,
  ArticleResponse,
  EditArticleRequestParams,
  EditArticleRequestBody,
  RemoveArticleRequestParams,
} from './api'
import { RequestUserIdHeader } from '../common'


@injectable()
export class ArticlesHttpClient implements ArticlesClient {

  private readonly SERVICE_URL = process.env.ARTICLES_SERVICE_URL

  public async list(): Promise<ArticleListResponse> {
    const url = `${this.SERVICE_URL}/api/articles`
    const result: AxiosResponse<ArticleModel[]> = await axios.get(url)
    const { data } = result

    return { data }
  }

  public async create(body: CreateArticleRequestBody, headers: RequestUserIdHeader): Promise<ArticleResponse> {
    const url = `${this.SERVICE_URL}/api/articles`
    const h = new AxiosHeaders()
    h.set('request-user-id', headers['request-user-id'])
    const result: AxiosResponse<ArticleModel> = await axios.post(
      url,
      body,
      {
        headers: h,
      }
    )
    const { data } = result

    return { data }
  }

  public async edit(
    params: EditArticleRequestParams,
    body: EditArticleRequestBody,
    headers: RequestUserIdHeader
  ): Promise<ArticleResponse> {
    const url = `${this.SERVICE_URL}/api/articles/${params.id}`
    const h = new AxiosHeaders()
    h.set('request-user-id', headers['request-user-id'])
    const result: AxiosResponse<ArticleModel> = await axios.put(url, body, { headers: h })
    const { data } = result

    return { data }
  }

  public async remove(params: RemoveArticleRequestParams, headers: RequestUserIdHeader): Promise<boolean> {
    const url = `${this.SERVICE_URL}/api/articles/${params.id}`
    const h = new AxiosHeaders()
    h.set('request-user-id', headers['request-user-id'])
    const result: AxiosResponse<boolean> = await axios.delete(url, { headers: h })
    const { data } = result

    return data
  }

}
