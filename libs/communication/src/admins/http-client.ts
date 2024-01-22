import { injectable } from 'inversify'
import axios, { AxiosResponse } from 'axios'
import { AdminsClient } from './admins.client'
import { AuthenticationRequestBody, AuthenticationResponseBody } from './api'


@injectable()
export class AdminsHttpClient implements AdminsClient {

  private readonly SERVICE_URL = process.env.ADMINS_SERVICE_URL

  public async authenticate(body: AuthenticationRequestBody): Promise<AuthenticationResponseBody> {
    const url = `${this.SERVICE_URL}/api/admin/authentication`
    const result: AxiosResponse<AuthenticationResponseBody> = await axios.post(url, body)
    const { data } = result

    return data
  }

}
