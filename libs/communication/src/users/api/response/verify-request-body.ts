import { IsString } from 'class-validator'


export class VerifyResponseBody {

  @IsString()
  userId: string

}
