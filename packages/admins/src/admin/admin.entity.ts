import { StringUtils }  from '@kidsbe/common'
import { CreateAdminPayload } from './create-admin-payload'


export class Admin {

  private readonly id: string
  private readonly userId: string
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(payload: CreateAdminPayload) {
    this.id = payload.id || StringUtils.uuid()
    this.userId = payload.userId
    this.createdAt = payload.createdAt || new Date()
    this.updatedAt = payload.updatedAt || new Date()
  }

  public static new(payload: CreateAdminPayload): Admin {
    const admin = new Admin(payload)
    return admin
  }

  public getId(): string {
    return this.id
  }

  public getUserId(): string {
    return this.userId
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

}
