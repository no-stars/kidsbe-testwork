import { AuthenticationRequestBody } from './api'
import { AuthenticationResponseBody } from './api'

export interface AdminsClient {
  authenticate(body: AuthenticationRequestBody): Promise<AuthenticationResponseBody>
}
