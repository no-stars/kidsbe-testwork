import { randomUUID } from 'crypto'


export class StringUtils {

  static uuid(): string {
    return randomUUID()
  }

}
