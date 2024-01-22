import 'reflect-metadata'
import { RemoveArticleUseCase } from '../../src/use-cases/remove-article.usecase'
import { ArticlesRepositoryPort } from '../../src/repositories/articles.port'
import { Article } from '../../src/article/article.entity'
import { AdminsClient } from '@kidsbe/communication'
import { RemoveArticleUseCaseAdapter } from '../../src/adapters/remove-article-usecase.adapter'


const repositoryMock = jest.fn().mockImplementation(() => {
  return {
    addArticle: jest.fn(),
    findArticle: jest.fn(),
    findArticleList: jest.fn(),
    updateArticle: jest.fn(),
    deleteArticle: jest.fn(),
  }
})

const adminsServiceMock = jest.fn().mockImplementation(() => {
  return {
    authenticate: jest.fn(),
  }
})


describe('RemoveArticleUseCase', () => {
  let repository: ArticlesRepositoryPort
  let admins: AdminsClient
  let service: RemoveArticleUseCase

  beforeEach(() => {
    repository = repositoryMock()
    admins = adminsServiceMock()
    service = new RemoveArticleUseCase(repository, admins)
  })

  it('should raise an error if article does not exist', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const useCasePayload = new RemoveArticleUseCaseAdapter(
      articleId,
      userId
    )
    const findArticle = repository.findArticle as jest.Mock

    // when
    findArticle.mockReturnValue(null)
    const fn = async () => await service.execute(useCasePayload)

    // then
    await expect(fn()).rejects.toThrow()
  })

  it('should delete an article if it is belongs to user', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const article = Article.new({
      title: 'Article 1',
      content: 'Zcx asd',
      authorId: userId,
      // authorId: 'a8e480f7-1678-4069-8821-5dcaec10628f',
    })
    const useCasePayload = new RemoveArticleUseCaseAdapter(
      article.getId(),
      userId
    )

    const findArticle = repository.findArticle as jest.Mock
    const deleteArticle = repository.deleteArticle as jest.Mock

    // when
    findArticle.mockReturnValue(article)
    deleteArticle.mockReturnValue(true)
    const response = await service.execute(useCasePayload)

    // then
    expect(deleteArticle).toBeCalledTimes(1)
    expect(response).toEqual(true)
  })

  it('should delete article if user is admin', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const article = Article.new({
      title: 'Article 1',
      content: 'Zcx asd',
      authorId: 'a8e480f7-1678-4069-8821-5dcaec10628f',
    })
    const useCasePayload = new RemoveArticleUseCaseAdapter(
      article.getId(),
      userId
    )

    const authenticate = admins.authenticate as jest.Mock
    const findArticle = repository.findArticle as jest.Mock
    const deleteArticle = repository.deleteArticle as jest.Mock

    // when
    authenticate.mockReturnValue({ authenticated: true })
    findArticle.mockReturnValue(article)
    deleteArticle.mockReturnValue(true)
    const response = await service.execute(useCasePayload)

    // then
    expect(deleteArticle).toBeCalledTimes(1)
    expect(authenticate).toBeCalledTimes(1)
    expect(response).toEqual(true)
  })

  it('should raise an error if user neither owner nor admin', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const article = Article.new({
      title: 'Article 1',
      content: 'Zcx asd',
      authorId: 'a8e480f7-1678-4069-8821-5dcaec10628f',
    })
    const useCasePayload = new RemoveArticleUseCaseAdapter(
      articleId,
      userId
    )
    const authenticate = admins.authenticate as jest.Mock
    const findArticle = repository.findArticle as jest.Mock

    // when
    authenticate.mockReturnValue({ authenticated: false })
    findArticle.mockReturnValue(article)
    const fn = async () => await service.execute(useCasePayload)

    // then
    await expect(fn()).rejects.toThrow()
  })
})
