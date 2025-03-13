import type { DeliveryPersonRepository } from "../../src/domain/delivery/application/repositories/delivery-person-repository"
import type { DeliveryPerson } from "../../src/domain/delivery/enterprise/entities/delivery-person"

export class InMemoryDeliveryPersonRepository implements DeliveryPersonRepository {
    public items: DeliveryPerson[] = []

    async create(data: DeliveryPerson): Promise<void> {
        await this.items.push(data)
    }

    async findById(id: string): Promise<DeliveryPerson | null> {
        const item = await this.items.find(item => item.id.toString === id)

        if(!item) {
            return null
        }

        return item
    }

    async save(data: DeliveryPerson): Promise<void> {
        const index = await this.items.findIndex(item => item.id.toString === data.id.toString)

        this.items[index] = data
    }
}