import { plainToInstance } from 'class-transformer'
import { validateOrReject, ValidationError } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { Code, Exception } from '../utils'


export const ValidationMiddleware = (
  type: any,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const transformed = plainToInstance(type, req.body)

    try {
      await validateOrReject(
        transformed,
        {
          skipMissingProperties,
          whitelist,
          forbidNonWhitelisted,
        }
      )

      req.body = transformed
      next()
    } catch (errors) {
      const constraints: string[] = []

      for (const error of errors) {
        if (error instanceof ValidationError && error.constraints) {
          const constraint: string[] = Object.values(error.constraints)
          constraints.push(...constraint)
        }
      }

      const exception = Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        data: constraints,
      })

      next(exception)
    }
  }
}
