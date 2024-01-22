import { SignUpRequestBody } from '@kidsbe/communication'


export class SignUpUseCaseAdapter {

  public readonly login: string
  public readonly password: string

  constructor(request: SignUpRequestBody) {
    this.login = request.login
    this.password = request.password
  }

}
