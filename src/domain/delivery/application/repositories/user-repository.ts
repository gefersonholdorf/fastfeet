import { User } from "../../enterprise/entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>
    abstract findById(id: number): Promise<User | null>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findByCpf(cpf: string): Promise<User | null>
    abstract save(user: User, id: number): Promise<void>
}