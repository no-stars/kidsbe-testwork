import { Admin } from '../admin/admin.entity'

export interface AdminRepositoryPort {
  findAdmin(by: { userId: string }): Promise<Admin | null>
}
