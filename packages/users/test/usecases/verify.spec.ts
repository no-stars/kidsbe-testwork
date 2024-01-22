import 'reflect-metadata'
import { verify } from 'jsonwebtoken'
import { VerifyUseCase } from '../../src/use-cases/verify.usecase'
import { UserRepositoryPort } from '../../src/repositories/user.port'
import { VerifyUsecaseAdapter } from '../../src/adapters/verify-usecase.adapter'
import { User } from '../../src/user/user.entity'


jest.mock('jsonwebtoken', () => {
  return {
    verify: jest.fn(),
  }
})

const repositoryMock = jest.fn().mockImplementation(() => {
  return {
    addUser: jest.fn(),
    findUser: jest.fn(),
  }
})


describe('VerifyUseCase', () => {
  const verifyMock = verify as jest.Mock
  let repository: UserRepositoryPort
  let service: VerifyUseCase

  beforeEach(() => {
    repository = repositoryMock()
    service = new VerifyUseCase(repository)
  })

  it('should raise an error if token do not contain user id payload', async () => {
    // given
    const useCasePayload = new VerifyUsecaseAdapter({
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJzdWIiOiI0MGZhYTI5YS1lNTYyLTRhMmUtYTFiZC00MDU3ZjQ2ODMzNDYiLCJpYXQiOjE3MDU4MjM3NzEsImV4cCI6MTcwNTgyNzM3MX0.'
        + 'tJLuW-BvFU_Anob6Dq1kRKyP8jhiREm5HGrq8HjQ3G0',
    })

    // when
    verifyMock.mockReturnValue({ unknown: '6df38098-7cce-4e96-8141-9b95b4bad207' })
    const fn = async () => await service.execute(useCasePayload)

    // then
    await expect(fn()).rejects.toThrow()
  })

  it('should raise an error if user id from token payload does not exist', async () => {
    // given
    const useCasePayload = new VerifyUsecaseAdapter({
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJzdWIiOiI0MGZhYTI5YS1lNTYyLTRhMmUtYTFiZC00MDU3ZjQ2ODMzNDYiLCJpYXQiOjE3MDU4MjM3NzEsImV4cCI6MTcwNTgyNzM3MX0.'
        + 'tJLuW-BvFU_Anob6Dq1kRKyP8jhiREm5HGrq8HjQ3G0',
    })
    const findUser = repository.findUser as jest.Mock

    // when
    findUser.mockReturnValue(null)
    verifyMock.mockReturnValue({ sub: '6df38098-7cce-4e96-8141-9b95b4bad207' })
    const fn = async () => await service.execute(useCasePayload)

    // then
    await expect(fn()).rejects.toThrow()
  })

  it('should return valid user id if user exist', async () => {
    // given
    const useCasePayload = new VerifyUsecaseAdapter({
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
        + 'eyJzdWIiOiI0MGZhYTI5YS1lNTYyLTRhMmUtYTFiZC00MDU3ZjQ2ODMzNDYiLCJpYXQiOjE3MDU4MjM3NzEsImV4cCI6MTcwNTgyNzM3MX0.'
        + 'tJLuW-BvFU_Anob6Dq1kRKyP8jhiREm5HGrq8HjQ3G0',
    })
    const findUser = repository.findUser as jest.Mock
    const user = await User.new({ login: 'login123',
      password: 'root4' })
    const expectedUserId = user.getId()

    // when
    findUser.mockReturnValue(user)
    verifyMock.mockReturnValue({ sub: user.getId() })
    const { userId: actualUserId } = await service.execute(useCasePayload)

    // then
    expect(actualUserId).toBe(expectedUserId)
  })
})
