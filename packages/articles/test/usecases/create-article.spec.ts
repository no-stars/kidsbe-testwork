import 'reflect-metadata'
import { CreateArticleUseCase } from '../../src/use-cases/create-article.usecase'
import { ArticlesRepositoryPort } from '../../src/repositories/articles.port'
import { CreateArticleUsecaseAdapter } from '../../src/adapters/create-article-usecase.adapter'
import { Article } from '../../src/article/article.entity'


const repositoryMock = jest.fn().mockImplementation(() => {
  return {
    addArticle: jest.fn(),
    findArticle: jest.fn(),
    findArticleList: jest.fn(),
    updateArticle: jest.fn(),
    deleteArticle: jest.fn(),
  }
})


describe('CreateArticleUseCase', () => {
  let repository: ArticlesRepositoryPort
  let service: CreateArticleUseCase

  beforeEach(() => {
    repository = repositoryMock()
    service = new CreateArticleUseCase(repository)
  })

  it('should create and return article', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const useCasePayload = new CreateArticleUsecaseAdapter(
      {
        title: 'Article title',
        content: 'Content 123',
      },
      userId
    )
    const addArticle = repository.addArticle as jest.Mock
    const article = Article.new({
      title: useCasePayload.title,
      content: useCasePayload.content,
      authorId: userId,
    })

    // when
    addArticle.mockReturnValue(article)
    const actualArticle = await service.execute(useCasePayload)

    // then
    expect(addArticle).toBeCalledTimes(1)
    expect(actualArticle.getAuthorId()).toEqual(userId)
    expect(actualArticle.getTitle()).toEqual(useCasePayload.title)
    expect(actualArticle.getContent()).toEqual(useCasePayload.content)
  })
})
