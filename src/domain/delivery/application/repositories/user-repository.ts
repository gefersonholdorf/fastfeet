import { PaginationParams } from "src/core/repositories/pagination-params";
import { User } from "../../enterprise/entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>
    abstract findById(id: number): Promise<User | null>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findByCpf(cpf: string): Promise<User | null>
    abstract findAll(params: PaginationParams): Promise<User[]>
    abstract save(user: User): Promise<void>
}