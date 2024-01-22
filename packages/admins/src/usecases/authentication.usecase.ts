import { inject, injectable } from 'inversify'
import { Admin } from '../admin/admin.entity'
import { Token } from '../config/di'
import { AdminRepositoryPort } from '../repositories/admin.port'
import { AuthenticationUseCaseAdapter } from '../adapters/authentication-usecase.adapter'

interface Result {
  authenticated: boolean
}


@injectable()
export class AuthenticationUseCase {

  constructor(@inject(Token.PgAdminRepository) private readonly adminRepository: AdminRepositoryPort) {}

  public async execute(payload: AuthenticationUseCaseAdapter): Promise<Result> {
    const existAdmin: Admin | null = await this.adminRepository.findAdmin({ userId: payload.userId })
    const authenticated: boolean = !!existAdmin

    return { authenticated }
  }

}
