import 'reflect-metadata'
import { AuthenticationUseCase } from '../../src/usecases/authentication.usecase'
import { AdminRepositoryPort } from '../../src/repositories/admin.port'
import { AuthenticationUseCaseAdapter } from '../../src/adapters/authentication-usecase.adapter'
import { Admin } from '../../src/admin/admin.entity'


const repositoryMock = jest.fn().mockImplementation(() => {
  return {
    findAdmin: jest.fn(),
  }
})


describe('AuthenticationUseCase', () => {
  let repository: AdminRepositoryPort
  let service: AuthenticationUseCase

  beforeEach(() => {
    repository = repositoryMock()
    service = new AuthenticationUseCase(repository)
  })

  it('should return false if admin for provided user does not exist', async () => {
    // given
    const useCasePayload = new AuthenticationUseCaseAdapter({ userId: '6df38098-7cce-4e96-8141-9b95b4bad207' })
    const findAdmin = repository.findAdmin as jest.Mock
    const expected = { authenticated: false }

    // when
    findAdmin.mockReturnValue(null)
    const actual = await service.execute(useCasePayload)

    // then
    expect(actual).toEqual(expected)
  })

  it('should return true if admin for provided user exists', async () => {
    // given
    const userId: string = '6df38098-7cce-4e96-8141-9b95b4bad207'
    const useCasePayload = new AuthenticationUseCaseAdapter({ userId })
    const findAdmin = repository.findAdmin as jest.Mock
    const expected = { authenticated: true }
    const admin = Admin.new({ userId })

    // when
    findAdmin.mockReturnValue(admin)
    const actual = await service.execute(useCasePayload)

    // then
    expect(actual).toEqual(expected)
  })
})
