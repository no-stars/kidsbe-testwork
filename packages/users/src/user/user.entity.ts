import { hash, genSalt, compare } from 'bcrypt'
import { StringUtils }  from '@kidsbe/common'
import { CreateUserPayload } from './create-user-payload'


export class User {

  private readonly id: string
  private readonly login: string
  private password: string
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(payload: CreateUserPayload) {
    this.id = payload.id || StringUtils.uuid()
    this.login = payload.login
    this.password = payload.password
    this.createdAt = payload.createdAt || new Date()
    this.updatedAt = payload.updatedAt || new Date()
  }

  public static async new(payload: CreateUserPayload): Promise<User> {
    const user = new User(payload)
    await user.hashPassword()

    return user
  }

  public getId(): string {
    return this.id
  }

  public getLogin(): string {
    return this.login
  }

  public getPassword(): string {
    return this.password
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await genSalt(10)
    const encryptedPassword: string = await hash(this.password, salt)
    this.password = encryptedPassword
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }

}
