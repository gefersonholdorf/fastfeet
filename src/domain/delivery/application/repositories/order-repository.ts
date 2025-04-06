import { PaginationParams } from "src/core/repositories/pagination-params";
import { Order } from "../../enterprise/entities/order";

export abstract class OrderRepository {
    abstract create(order: Order): Promise<void>
    abstract findById(id: number): Promise<Order | null>
    abstract findAll(params: PaginationParams): Promise<Order[]>
    abstract save(order: Order): Promise<void>
}