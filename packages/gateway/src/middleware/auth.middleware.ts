import { NextFunction, Request, Response } from 'express'
import { AuthorizedRequest, Exception, Code } from '@kidsbe/common'
import { UsersHttpClient } from '@kidsbe/communication'


export const AuthMiddleware = async (
  req: Request & AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader: string = req.headers.authorization ?? ''
    const accessToken: string | undefined = authorizationHeader.split(' ')?.[1]

    if (!accessToken) {
      throw Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    }

    const client = new UsersHttpClient()
    const response = await client.verify({ accessToken })

    if (!response?.userId) {
      throw Exception.new({ code: Code.UNAUTHORIZED_ERROR })
    }

    req.userId = response.userId
    next()
  } catch (error) {
    next(error)
  }
}
