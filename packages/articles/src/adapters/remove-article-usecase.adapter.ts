import { Code, Exception } from '@kidsbe/common'


export class RemoveArticleUseCaseAdapter {

  public readonly articleId: string
  public readonly userId: string

  constructor(
    articleId: string | undefined,
    userId: string | string[] | undefined
  ) {
    if (typeof userId !== 'string' || !userId) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'User id header is corrupted',
      })
    }

    if (!articleId) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'Article param is required',
      })
    }

    this.articleId = articleId
    this.userId = userId
  }

}
