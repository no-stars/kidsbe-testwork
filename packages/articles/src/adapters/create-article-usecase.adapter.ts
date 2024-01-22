import { CreateArticleRequestBody } from '@kidsbe/communication'
import { Exception, Code } from '@kidsbe/common'


export class CreateArticleUsecaseAdapter {

  public readonly userId: string
  public readonly title: string
  public readonly content: string

  constructor(request: CreateArticleRequestBody, userId: string | string[] | undefined) {
    if (typeof userId !== 'string' || !userId) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'User id header is corrupted',
      })
    }

    this.title = request.title
    this.content = request.content
    this.userId = userId
  }

}
