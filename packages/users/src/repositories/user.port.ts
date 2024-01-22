import { User } from '../user/user.entity'


export interface UserRepositoryPort {
  addUser(user: User): Promise<User>
  findUser(by: { login?: string, userId?: string }): Promise<User | null>
}
