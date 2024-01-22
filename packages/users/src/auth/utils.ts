import { sign } from 'jsonwebtoken'
import { AccessToken } from './access-token'
import { JwtPayload } from './jwt-payload'
import { User } from '../user/user.entity'
import { SecurityConfig } from '../config'


export class AuthUtils {

  public static createToken(user: User): AccessToken {
    const tokenPayload: JwtPayload = { sub: user.getId() }
    const expiresIn: number = 60 * 60

    return {
      expiresIn,
      accessToken: sign(tokenPayload, SecurityConfig.JWT_SECRET, { expiresIn }),
    }
  }

  public static createCookie(tokenData: AccessToken): string {
    return `Authorization=${tokenData.accessToken}; HttpOnly; Max-Age=${tokenData.expiresIn};`
  }

}
