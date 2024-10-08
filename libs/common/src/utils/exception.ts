import { CodeDescription } from './api-code'


export type CreateExceptionPayload<TData> = {
  code: CodeDescription,
  overrideMessage?: string,
  data?: TData
}

export class Exception<TData> extends Error {

  public readonly code: number
  public readonly data?: TData

  private constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: TData) {
    super()

    this.name = this.constructor.name
    this.code = codeDescription.code
    this.data = data
    this.message = overrideMessage || codeDescription.message

    Error.captureStackTrace(this, this.constructor)
  }

  public static new<TData>(payload: CreateExceptionPayload<TData>): Exception<TData> {
    return new Exception(payload.code, payload.overrideMessage, payload.data)
  }

}
