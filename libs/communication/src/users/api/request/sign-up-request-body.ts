import { IsString } from 'class-validator'


export class SignUpRequestBody {

  @IsString()
  login: string

  @IsString()
  password: string

}
