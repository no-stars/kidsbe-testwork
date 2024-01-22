import { injectable } from 'inversify'
import axios  from 'axios'
import { AdminsClient } from './admins.client'
import { AuthenticationRequestBody } from './api'


@injectable()
export class AdminsHttpClient implements AdminsClient {

  private readonly SERVICE_URL = process.env.ADMINS_SERVICE_URL

  public async authenticate(body: AuthenticationRequestBody): Promise<any> {
    const url = `${this.SERVICE_URL}/api/admin/authentication`
    const result = await axios.post(url, body, { validateStatus: () => true })

    return result.data
  }

}
