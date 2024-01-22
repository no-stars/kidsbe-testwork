import { IsString } from 'class-validator'


export class CreateArticleRequestBody {

  @IsString()
  title: string

  @IsString()
  content: string

}
