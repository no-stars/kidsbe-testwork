import { injectable } from 'inversify'
import axios, { AxiosResponse } from 'axios'
import { UsersClient } from './users.client'
import { SignInRequestBody, SignInResponseBody, SignUpRequestBody, SignUpResponseBody } from './api'


@injectable()
export class UsersHttpClient implements UsersClient {

  private readonly SERVICE_URL = process.env.USERS_SERVICE_URL

  public async signIn(body: SignInRequestBody): Promise<SignInResponseBody> {
    const url = `${this.SERVICE_URL}/api/auth/sign_in`
    const result: AxiosResponse<SignInResponseBody> = await axios.post(url, body)
    const { data } = result

    return data
  }

  public async signUp(body: SignUpRequestBody): Promise<SignUpResponseBody> {
    const url = `${this.SERVICE_URL}/api/auth/sign_up`
    const result: AxiosResponse<SignUpResponseBody> = await axios.post(url, body)
    const { data } = result

    return data
  }

  public async verify(body: any): Promise<any> {
    const url = `${this.SERVICE_URL}/api/auth/verify`
    const result: AxiosResponse<any> = await axios.post(url, body, { validateStatus: () => true })
    const { data } = result

    return data
  }

}
