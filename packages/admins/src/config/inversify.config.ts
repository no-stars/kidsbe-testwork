import { Container } from 'inversify'
import { Token } from './di'

import { AdminRoute } from '../routes/admin.route'

import { AdminController } from '../controllers/admin.controller'
import { PostgresClient } from './db-connection'
import { PgAdminRepository } from '../repositories/admin.repository'
import { AuthenticationUseCase } from '../usecases/authentication.usecase'

const container = new Container()

container.bind<AdminRoute>(Token.AdminRoute).to(AdminRoute)

container.bind<AdminController>(Token.AdminController).to(AdminController)
container.bind<PostgresClient>(Token.PostgresClient).to(PostgresClient)
container.bind<PgAdminRepository>(Token.PgAdminRepository).to(PgAdminRepository)
container.bind<AuthenticationUseCase>(Token.AuthenticationUseCase).to(AuthenticationUseCase)

export { container }
