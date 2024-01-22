import {
  SignInRequestBody,
  SignInResponseBody,
  SignUpRequestBody,
  SignUpResponseBody,
} from './api'


export interface UsersClient {
  signIn(body: SignInRequestBody): Promise<SignInResponseBody>
  signUp(body: SignUpRequestBody): Promise<SignUpResponseBody>
}
