import { QueryResult } from 'pg'
import { inject, injectable } from 'inversify'
import { Token } from '../config/di'
import { PostgresClient } from '../config/db-connection'
import { Admin } from '../admin/admin.entity'
import { AdminRepositoryPort } from './admin.port'


@injectable()
export class PgAdminRepository implements AdminRepositoryPort {

  constructor(@inject(Token.PostgresClient) private readonly postgresClient: PostgresClient) {}

  public async findAdmin(by: { userId: string }): Promise<Admin | null> {
    const values = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT admin_id, user_id, created_at, updated_at
         FROM admins`

    if (by.userId) {
      whereConditions.push(`user_id = $${values.length + 1}`)
      values.push(by.userId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    const result: QueryResult = await this.postgresClient.query(queryText, values)
    const admins: Admin[] = toDomainEntities(result)

    return admins?.[0] || null
  }

}


function toDomainEntities(result: QueryResult): Admin[] {
  const admins: Admin[] = []

  for (const adminData of result.rows) {
    const admin = new Admin({
      id: adminData.admin_id,
      userId: adminData.user_id,
      createdAt: adminData.created_at,
      updatedAt: adminData.updated_at,
    })

    admins.push(admin)
  }

  return admins
}
