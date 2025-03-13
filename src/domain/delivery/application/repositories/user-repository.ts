import type { User } from "../../enterprise/entities/user";

export abstract class UserRepository {
    abstract create(data: User): Promise<void> 
    abstract findById(id: string): Promise<User | null>
    abstract findByCpf(cpf: string): Promise<User | null>
    abstract save(data: User): Promise<void>
}