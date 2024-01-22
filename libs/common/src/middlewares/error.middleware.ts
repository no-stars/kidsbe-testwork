import { NextFunction, Request, Response } from 'express'
import { ApiResponse, Code, Exception } from '../utils'


export const ErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let errorResponse: ApiResponse<unknown> = ApiResponse.error(Code.INTERNAL_ERROR.code, error.message)

    if (error instanceof Exception) {
      errorResponse = ApiResponse.error(error.code, error.message, error.data)
    }

    res.status(errorResponse.code).json(errorResponse)
  } catch (error) {
    next(error)
  }
}
