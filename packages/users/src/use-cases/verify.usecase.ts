import { verify } from 'jsonwebtoken'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { User } from '../user/user.entity'
import { SecurityConfig } from '../config'
import { JwtPayload } from '../auth/jwt-payload'
import { UserRepositoryPort } from '../repositories/user.port'
import { VerifyUsecaseAdapter } from '../adapters/verify-usecase.adapter'
import { Exception, Code } from '@kidsbe/common'


interface Result {
  userId: string
}

@injectable()
export class VerifyUseCase {

  constructor(@inject(Token.PgUserRepository) private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: VerifyUsecaseAdapter): Promise<Result> {
    const tokenPayload: JwtPayload = (await verify(payload.accessToken, SecurityConfig.JWT_SECRET)) as JwtPayload
    const userId: string = tokenPayload.sub

    if (!userId) {
      throw Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    }

    const existUser: User | null = await this.userRepository.findUser({ userId })

    if (!existUser) {
      throw Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    }

    return { userId }
  }

}
