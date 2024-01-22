import { StringUtils } from '@kidsbe/common'
import { CreateArticlePayload } from './create-article-payload'
import { EditArticlePayload } from './edit-article-payload'


export class Article {

  private readonly id: string
  private title: string
  private content: string
  private readonly authorId: string
  private modifiedBy: string | null
  private readonly createdAt: Date
  private updatedAt: Date

  constructor(payload: CreateArticlePayload) {
    this.id = payload.id || StringUtils.uuid()
    this.title = payload.title
    this.content = payload.content
    this.authorId = payload.authorId
    this.modifiedBy = payload.modifiedBy || null
    this.createdAt = payload.createdAt || new Date()
    this.updatedAt = payload.updatedAt || new Date()
  }

  public static new(payload: CreateArticlePayload): Article {
    const article = new Article(payload)
    return article
  }

  public edit(payload: EditArticlePayload): void {
    const currentDate = new Date()

    if (this.title !== payload.title) {
      this.title = payload.title
      this.modifiedBy = payload.modifiedBy
      this.updatedAt = currentDate
    }

    if (this.content !== payload.content) {
      this.content = payload.content
      this.modifiedBy = payload.modifiedBy
      this.updatedAt = currentDate
    }
  }

  public getId(): string {
    return this.id
  }

  public getTitle(): string {
    return this.title
  }

  public getContent(): string {
    return this.content
  }

  public getAuthorId(): string {
    return this.authorId
  }

  public getModifiedBy(): string | null {
    return this.modifiedBy
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

}
