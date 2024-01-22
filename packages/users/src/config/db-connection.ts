import { injectable } from 'inversify'
import { Pool, QueryResult, QueryResultRow } from 'pg'
import { DatabaseConfig } from '../config'


@injectable()
export class PostgresClient {

  private readonly pool: Pool

  constructor() {
    this.pool = new Pool({
      host: DatabaseConfig.DB_HOST,
      port: DatabaseConfig.DB_PORT,
      user: DatabaseConfig.DB_USER,
      password: DatabaseConfig.DB_PASS,
      database: DatabaseConfig.DB_NAME,
    })
  }

  public query<R extends QueryResultRow = any, I extends any[] = any[]>(
    text: string,
    params: I
  ): Promise<QueryResult<R>> {
    return this.pool.query(text, params)
  }

}
