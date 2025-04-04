import { PaginationParams } from "src/core/repositories/pagination-params";
import { User } from "../../enterprise/entities/user";

export interface UserRepository {
    create(data: User): Promise<void>
    findById(id: number): Promise<User | null>
    findAll(params: PaginationParams): Promise<User[]>
    save(data: User): Promise<void>
}