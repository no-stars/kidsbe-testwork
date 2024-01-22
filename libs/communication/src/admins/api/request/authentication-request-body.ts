import { IsString, IsUUID } from 'class-validator'


export class AuthenticationRequestBody {

  @IsString()
  @IsUUID()
  userId: string

}
