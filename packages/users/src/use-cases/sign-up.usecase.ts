import { injectable, inject } from 'inversify'
import { User } from '../user/user.entity'
import { AccessToken } from '../auth/access-token'
import { Token } from '../config/di'
import { AuthUtils } from '../auth/utils'
import { UserRepositoryPort } from '../repositories/user.port'
import { SignUpUseCaseAdapter } from '../adapters/sign-up-usecase.adapter'
import { Exception, Code } from '@kidsbe/common'


@injectable()
export class SignUpUseCase {

  constructor(@inject(Token.PgUserRepository) private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: SignUpUseCaseAdapter): Promise<AccessToken> {
    const existUser: User | null = await this.userRepository.findUser({ login: payload.login })

    if (existUser) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: 'User already exist',
      })
    }

    const user = await User.new({
      login: payload.login,
      password: payload.password,
    })
    const addedUser: User = await this.userRepository.addUser(user)
    const tokenData: AccessToken = AuthUtils.createToken(addedUser)

    return tokenData
  }

}
