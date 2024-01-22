import { IsString } from 'class-validator'


export class SignInRequestBody {

  @IsString()
  login: string

  @IsString()
  password: string

}
