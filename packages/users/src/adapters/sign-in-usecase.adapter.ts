import { SignInRequestBody } from '@kidsbe/communication'


export class SignInUseCaseAdapter {

  public readonly login: string
  public readonly password: string

  constructor(request: SignInRequestBody) {
    this.login = request.login
    this.password = request.password
  }

}
