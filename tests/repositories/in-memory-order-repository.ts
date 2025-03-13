import type { PaginationParams } from "../../src/core/repositories/pagination-params"
import type { QueryAddress } from "../../src/core/repositories/query-address"
import type { OrderRepository } from "../../src/domain/delivery/application/repositories/order-repository"
import type { Order } from "../../src/domain/delivery/enterprise/entities/order"

export class InMemoryOrderRepository implements OrderRepository {
    public items: Order[] = []

    async create(data: Order): Promise<void> {
        await this.items.push(data)
    }

    async findById(id: string): Promise<Order | null> {
        const item = await this.items.find(item => item.id.toString === id)

        if(!item) {
            return null
        }

        return item
    }

    async save(data: Order): Promise<void> {
        const index = await this.items.findIndex(item => item.id.toString === data.id.toString)

        this.items[index] = data
    }

    findManyByUserId(id: string, params: PaginationParams): Promise<Order[]> {
        throw new Error("Method not implemented.")
    }
    
    findManyByAddress(query: QueryAddress, params: PaginationParams): Promise<Order[]> {
        throw new Error("Method not implemented.")
    }
}