import { get } from 'env-var'


export class DatabaseConfig {

  public static readonly DB_TYPE: string = get('DB_TYPE').required().asString()
  public static readonly DB_HOST: string = get('DB_HOST').required().asString()
  public static readonly DB_PORT: number = get('DB_PORT').required().asPortNumber()
  public static readonly DB_USER: string = get('DB_USER').required().asString()
  public static readonly DB_PASS: string = get('DB_PASS').required().asString()
  public static readonly DB_NAME: string = get('DB_NAME').required().asString()

}
