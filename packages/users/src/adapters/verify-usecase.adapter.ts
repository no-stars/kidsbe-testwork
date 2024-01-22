import { VerifyRequestBody } from '@kidsbe/communication'


export class VerifyUsecaseAdapter {

  public readonly accessToken: string

  constructor(request: VerifyRequestBody) {
    this.accessToken = request.accessToken
  }

}
