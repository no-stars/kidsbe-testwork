import { Container } from 'inversify'
import { Token } from './di'

import { PostgresClient } from './db-connection'
import { AdminsHttpClient } from '@kidsbe/communication'
import { PgArticleRepository } from '../repositories/articles.repository'
import { CreateArticleUseCase } from '../use-cases/create-article.usecase'
import { EditArticleUseCase } from '../use-cases/edit-article.usecase'
import { GetArticleListUseCase } from '../use-cases/get-article-list.usecase'
import { RemoveArticleUseCase } from '../use-cases/remove-article.usecase'
import { ArticlesRoute } from '../routes/articles.route'
import { ArticlesController } from '../controllers/articles.controller'

const container = new Container()

container.bind<ArticlesController>(Token.ArticlesController).to(ArticlesController)
container.bind<ArticlesRoute>(Token.ArticlesRoute).to(ArticlesRoute)
container.bind<PostgresClient>(Token.PostgresClient).to(PostgresClient)
container.bind<AdminsHttpClient>(Token.AdminsHttpClient).to(AdminsHttpClient)
container.bind<PgArticleRepository>(Token.PgArticleRepository).to(PgArticleRepository)
container.bind<CreateArticleUseCase>(Token.CreateArticleUseCase).to(CreateArticleUseCase)
container.bind<EditArticleUseCase>(Token.EditArticleUseCase).to(EditArticleUseCase)
container.bind<GetArticleListUseCase>(Token.GetArticleListUseCase).to(GetArticleListUseCase)
container.bind<RemoveArticleUseCase>(Token.RemoveArticleUseCase).to(RemoveArticleUseCase)

export { container }
