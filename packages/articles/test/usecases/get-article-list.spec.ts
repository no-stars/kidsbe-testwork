import 'reflect-metadata'
import { GetArticleListUseCase } from '../../src/use-cases/get-article-list.usecase'
import { ArticlesRepositoryPort } from '../../src/repositories/articles.port'
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


describe('GetArticleListUseCase', () => {
  let repository: ArticlesRepositoryPort
  let service: GetArticleListUseCase

  beforeEach(() => {
    repository = repositoryMock()
    service = new GetArticleListUseCase(repository)
  })

  it('should return list of articles', async () => {
    // given
    const findArticleList = repository.findArticleList as jest.Mock
    const expectedArticles = [
      Article.new({
        title: 'Title 1',
        content: 'Content 12',
        authorId: '52ec0a05-eb74-40df-82fa-24a1bd0dc618',
      }),
      Article.new({
        title: 'Title 2',
        content: 'Content 23',
        authorId: 'aed3a8d5-701d-4592-982e-39ea11bb9f35',
      }),
    ]

    // when
    findArticleList.mockReturnValue(expectedArticles)
    const actualArticles = await service.execute()

    // then
    expect(findArticleList).toBeCalledTimes(1)
    expect(actualArticles).toEqual(expectedArticles)
  })
})
