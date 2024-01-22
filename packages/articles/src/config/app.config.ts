import { get } from 'env-var'


export class AppConfig {

  public static readonly APP_PORT: number = get('APP_PORT').required().asPortNumber()
  public static readonly APP_BASE_PATH: string = get('APP_BASE_PATH').required().asString()
  public static readonly SWAGGER_BASE_PATH: string = get('SWAGGER_BASE_PATH').required().asString()
  public static readonly NODE_ENV: string = get('NODE_ENV').required().asString()
  public static readonly SERVICE_NAME: string = get('SERVICE_NAME').required().asString()

}
