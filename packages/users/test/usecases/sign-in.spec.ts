import 'reflect-metadata'
import { SignInUseCase } from '../../src/use-cases/sign-in.usecase'
import { UserRepositoryPort } from '../../src/repositories/user.port'
import { SignInUseCaseAdapter } from '../../src/adapters/sign-in-usecase.adapter'
import { User } from '../../src/user/user.entity'
import { AuthUtils } from '../../src/auth/utils'
import { AccessToken } from '../../src/auth/access-token'


const repositoryMock = jest.fn().mockImplementation(() => {
  return {
    addUser: jest.fn(),
    findUser: jest.fn(),
  }
})


describe('SignInUseCase', () => {
  let repository: UserRepositoryPort
  let service: SignInUseCase

  beforeEach(() => {
    repository = repositoryMock()
    service = new SignInUseCase(repository)
  })

  it('should raise an error if user not found', async () => {
    // given
    const useCasePayload = new SignInUseCaseAdapter({
      login: 'login123',
      password: 'root4',
    })
    const findUser = repository.findUser as jest.Mock

    // when
    findUser.mockReturnValue(null)
    const fn = async () => await service.execute(useCasePayload)

    // then
    await expect(fn()).rejects.toThrow()
  })

  it('should raise an error if user password is not valid', async () => {
    // given
    const useCasePayload = new SignInUseCaseAdapter({
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

  it('should return token if user password is valid', async () => {
    // given
    const useCasePayload = new SignInUseCaseAdapter({
      login: 'login123',
      password: 'root4root4',
    })
    const findUser = repository.findUser as jest.Mock
    const user = await User.new({ login: 'login123',
      password: 'root4root4' })
    const expectedToken: AccessToken = AuthUtils.createToken(user)

    // when
    findUser.mockReturnValue(user)
    const actualToken: AccessToken = await service.execute(useCasePayload)

    // then
    await expect(actualToken).toEqual(expectedToken)
  })
})
