import { get } from 'env-var'


export class SecurityConfig {

  public static readonly JWT_SECRET: string = get('JWT_SECRET').required().asString()

}
