import { EditArticleRequestBody } from '@kidsbe/communication'
import { Exception, Code } from '@kidsbe/common'


export class EditArticleUseCaseAdapter {

  public readonly articleId: string
  public readonly userId: string
  public readonly title: string
  public readonly content: string

  constructor(
    request: EditArticleRequestBody,
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
    this.title = request.title
    this.content = request.content
    this.userId = userId
  }

}
