export interface ArticleModel {
  id: string
  title: string
  content: string
  authorId: string
  modifiedBy: string | null
  createdAt: Date
  updatedAt: Date
}
