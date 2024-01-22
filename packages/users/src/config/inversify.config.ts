import { Container } from 'inversify'
import { Token } from './di'

import { PostgresClient } from './db-connection'
import { PgUserRepository } from '../repositories/user.repository'
import { SignInUseCase } from '../use-cases/sign-in.usecase'
import { SignUpUseCase } from '../use-cases/sign-up.usecase'
import { VerifyUseCase } from '../use-cases/verify.usecase'
import { AuthController } from '../controllers/auth.controller'
import { AuthRoute } from '../routes/auth.route'


const container = new Container()

container.bind<AuthRoute>(Token.AuthRoute).to(AuthRoute)
container.bind<AuthController>(Token.AuthController).to(AuthController)
container.bind<PgUserRepository>(Token.PgUserRepository).to(PgUserRepository)
container.bind<PostgresClient>(Token.PostgresClient).to(PostgresClient)
container.bind<SignInUseCase>(Token.SignInUseCase).to(SignInUseCase)
container.bind<SignUpUseCase>(Token.SignUpUseCase).to(SignUpUseCase)
container.bind<VerifyUseCase>(Token.VerifyUseCase).to(VerifyUseCase)

export { container }
