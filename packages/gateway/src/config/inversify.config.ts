import { Container } from 'inversify'
import { Token } from './di'

import { AuthRoute } from '../routes/auth.route'
import { ArticlesRoute } from '../routes/articles.route'

import { AuthController } from '../controllers/auth.controller'
import { ArticlesController } from '../controllers/articles.controller'

const container = new Container()

container.bind<AuthRoute>(Token.AuthRoute).to(AuthRoute)
container.bind<ArticlesRoute>(Token.ArticlesRoute).to(ArticlesRoute)

container.bind<AuthController>(Token.AuthController).to(AuthController)
container.bind<ArticlesController>(Token.ArticlesController).to(ArticlesController)

export { container }
