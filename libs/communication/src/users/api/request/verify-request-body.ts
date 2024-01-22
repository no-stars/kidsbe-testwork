import { IsString } from 'class-validator'


export class VerifyRequestBody {

  @IsString()
  accessToken: string

}
