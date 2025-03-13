import type { UserRepository } from "../../src/domain/delivery/application/repositories/user-repository"
import type { User } from "../../src/domain/delivery/enterprise/entities/user"

export class InMemoryUserRepository implements UserRepository {
    public items: User[] = []

    async create(data: User): Promise<void> {
        await this.items.push(data)
    }

    async findById(id: string): Promise<User | null> {
        const item = await this.items.find(item => item.id.toString === id)

        if(!item) {
            return null
        }

        return item
    }

    async save(data: User): Promise<void> {
        const index = await this.items.findIndex(item => item.id.toString === data.id.toString)

        this.items[index] = data
    }
}