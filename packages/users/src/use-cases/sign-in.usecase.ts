import { inject, injectable } from 'inversify'
import { User } from '../user/user.entity'
import { Token } from '../config/di'
import { AccessToken } from '../auth/access-token'
import { AuthUtils } from '../auth/utils'
import { UserRepositoryPort } from '../repositories/user.port'
import { SignInUseCaseAdapter } from '../adapters/sign-in-usecase.adapter'
import { Code, Exception } from '@kidsbe/common'


@injectable()
export class SignInUseCase {

  constructor(@inject(Token.PgUserRepository) private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: SignInUseCaseAdapter): Promise<AccessToken> {
    const existUser: User | null = await this.userRepository.findUser({ login: payload.login })

    if (!existUser) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'User does not exist',
      })
    }

    const isPasswordMatching: boolean = await existUser.comparePassword(payload.password)
    if (!isPasswordMatching) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        overrideMessage: 'Password is wrong',
      })
    }

    const tokenData: AccessToken = AuthUtils.createToken(existUser)

    return tokenData
  }

}
