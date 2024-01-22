import { AuthenticationRequestBody } from '@kidsbe/communication'


export class AuthenticationUseCaseAdapter {

  public readonly userId: string

  constructor(request: AuthenticationRequestBody) {
    this.userId = request.userId
  }

}
