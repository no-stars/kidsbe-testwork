import { IsString } from 'class-validator'


export class EditArticleRequestBody {

  @IsString()
  title: string

  @IsString()
  content: string

}
