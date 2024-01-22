import { QueryResult } from 'pg'
import { inject, injectable } from 'inversify'

import { Token } from '../config/di'
import { PostgresClient } from '../config/db-connection'
import { User } from '../user/user.entity'
import { UserRepositoryPort } from './user.port'


@injectable()
export class PgUserRepository implements UserRepositoryPort {

  constructor(@inject(Token.PostgresClient) private readonly postgresClient: PostgresClient) {}

  public async addUser(user: User): Promise<User> {
    const queryText
      = `INSERT INTO users
         (user_id, login, password, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)`

    const values = toPgValues(user)

    await this.postgresClient.query(queryText, values)

    return user
  }

  public async findUser(by: { login?: string, userId?: string }): Promise<User | null> {
    const values = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT user_id, login, password, created_at, updated_at
         FROM users`

    if (by.userId) {
      whereConditions.push(`user_id = $${values.length + 1}`)
      values.push(by.userId)
    }

    if (by.login) {
      whereConditions.push(`login = $${values.length + 1}`)
      values.push(by.login)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    const result: QueryResult = await this.postgresClient.query(queryText, values)
    const users: User[] = toDomainEntities(result)

    return users?.[0] || null
  }

}


function toDomainEntities(result: QueryResult) {
  const users: User[] = []

  for (const userData of result.rows) {
    const user = new User({
      id: userData.user_id,
      login: userData.login,
      password: userData.password,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    })

    users.push(user)
  }

  return users
}

function toPgValues(user: User): any[] {
  return [
    user.getId(),
    user.getLogin(),
    user.getPassword(),
    user.getCreatedAt(),
    user.getUpdatedAt(),
  ]
}
