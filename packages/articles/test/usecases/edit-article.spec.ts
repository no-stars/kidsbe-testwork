import 'reflect-metadata'
import { EditArticleUseCase } from '../../src/use-cases/edit-article.usecase'
import { ArticlesRepositoryPort } from '../../src/repositories/articles.port'
import { EditArticleUseCaseAdapter } from '../../src/adapters/edit-article-usecase.adapter'
import { Article } from '../../src/article/article.entity'
import { AdminsClient } from '@kidsbe/communication'


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


describe('EditArticleUseCase', () => {
  let repository: ArticlesRepositoryPort
  let admins: AdminsClient
  let service: EditArticleUseCase

  beforeEach(() => {
    repository = repositoryMock()
    admins = adminsServiceMock()
    service = new EditArticleUseCase(repository, admins)
  })

  it('should raise an error if article does not exist', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const useCasePayload = new EditArticleUseCaseAdapter(
      {
        title: 'Article title',
        content: 'Content 123',
      },
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

  it('should make changes and return result if article belongs to user', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const article = Article.new({
      title: 'Article 1',
      content: 'Zcx asd',
      authorId: userId,
      // authorId: 'a8e480f7-1678-4069-8821-5dcaec10628f',
    })
    const useCasePayload = new EditArticleUseCaseAdapter(
      {
        title: 'Article title',
        content: 'Content 123',
      },
      article.getId(),
      userId
    )
    const expectedArticle = Article.new({
      id: article.getId(),
      title: useCasePayload.title,
      content: useCasePayload.content,
      authorId: userId,
      modifiedBy: userId,
      updatedAt: new Date(),
      createdAt: article.getCreatedAt(),
    })
    const findArticle = repository.findArticle as jest.Mock
    const updateArticle = repository.updateArticle as jest.Mock

    // when
    findArticle.mockReturnValue(article)
    updateArticle.mockReturnValue(expectedArticle)
    const actualArticle = await service.execute(useCasePayload)

    // then
    expect(updateArticle).toBeCalledTimes(1)
    expect(actualArticle).toEqual(expectedArticle)
  })

  it('should make changes and return result if user is admin', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const articleId: string = 'f8c54e12-128b-40e0-b5ec-95da10314802'
    const article = Article.new({
      title: 'Article 1',
      content: 'Zcx asd',
      authorId: 'a8e480f7-1678-4069-8821-5dcaec10628f',
    })
    const useCasePayload = new EditArticleUseCaseAdapter(
      {
        title: 'Article title',
        content: 'Content 123',
      },
      article.getId(),
      userId
    )
    const expectedArticle = Article.new({
      id: article.getId(),
      title: useCasePayload.title,
      content: useCasePayload.content,
      authorId: 'a8e480f7-1678-4069-8821-5dcaec10628f',
      modifiedBy: userId,
      updatedAt: new Date(),
      createdAt: article.getCreatedAt(),
    })
    const authenticate = admins.authenticate as jest.Mock
    const findArticle = repository.findArticle as jest.Mock
    const updateArticle = repository.updateArticle as jest.Mock

    // when
    authenticate.mockReturnValue({ authenticated: true })
    findArticle.mockReturnValue(article)
    updateArticle.mockReturnValue(expectedArticle)
    const actualArticle = await service.execute(useCasePayload)

    // then
    expect(authenticate).toBeCalledTimes(1)
    expect(updateArticle).toBeCalledTimes(1)
    expect(actualArticle).toEqual(expectedArticle)
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
    const useCasePayload = new EditArticleUseCaseAdapter(
      {
        title: 'Article title',
        content: 'Content 123',
      },
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
