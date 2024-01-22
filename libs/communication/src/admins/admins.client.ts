import { AuthenticationRequestBody } from './api'

export interface AdminsClient {
  authenticate(body: AuthenticationRequestBody): Promise<any>
}
