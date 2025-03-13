import type { RecipientRepository } from "../../src/domain/delivery/application/repositories/recipient-repository";
import type { Recipient } from "../../src/domain/delivery/enterprise/entities/recipient";

export class InMemoryRecipientRepository implements RecipientRepository {
    public items: Recipient[] = []

    async create(data: Recipient): Promise<void> {
        await this.items.push(data)
    }

    async findById(id: string): Promise<Recipient | null> {
        const item = await this.items.find(item => item.id.toString === id)

        if(!item) {
            return null
        }

        return item
    }

    async save(data: Recipient): Promise<void> {
        const index = await this.items.findIndex(item => item.id.toString === data.id.toString)

        this.items[index] = data
    }
}