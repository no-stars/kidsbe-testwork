import 'reflect-metadata'
import { SignUpUseCase } from '../../src/use-cases/sign-up.usecase'
import { UserRepositoryPort } from '../../src/repositories/user.port'
import { SignUpUseCaseAdapter } from '../../src/adapters/sign-up-usecase.adapter'
import { User } from '../../src/user/user.entity'
import { AuthUtils } from '../../src/auth/utils'
import { AccessToken } from '../../src/auth/access-token'


const repositoryMock = jest.fn().mockImplementation(() => {
  return {
    addUser: jest.fn(),
    findUser: jest.fn(),
  }
})


describe('SignUpUseCase', () => {
  let repository: UserRepositoryPort
  let service: SignUpUseCase

  beforeEach(() => {
    repository = repositoryMock()
    service = new SignUpUseCase(repository)
  })

  it('should raise an error if user already exists', async () => {
    // given
    const useCasePayload = new SignUpUseCaseAdapter({
      login: 'login123',
      password: 'root4',
    })
    const findUser = repository.findUser as jest.Mock
    const user = await User.new({ login: 'login123',
      password: 'root3' })

    // when
    findUser.mockReturnValue(user)
    const fn = async () => await service.execute(useCasePayload)

    // then
    await expect(fn()).rejects.toThrow()
  })

  it('should create user and return valid access token', async () => {
    // given
    const useCasePayload = new SignUpUseCaseAdapter({
      login: 'login123',
      password: 'root4',
    })
    const findUser = repository.findUser as jest.Mock
    const addUser = repository.addUser as jest.Mock
    const user = await User.new({ login: 'login123',
      password: 'root4' })

    // when
    findUser.mockReturnValue(null)
    addUser.mockReturnValue(user)
    const actualToken: AccessToken = await service.execute(useCasePayload)
    const expectedToken: AccessToken = AuthUtils.createToken(user)

    // then
    expect(addUser).toBeCalledTimes(1)
    expect(actualToken.accessToken).toBe(expectedToken.accessToken)
  })
})
