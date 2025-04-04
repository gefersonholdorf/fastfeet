import { PaginationParams } from "src/core/repositories/pagination-params";
import { Order } from "../../enterprise/entities/order";

export interface OrderRepository {
    create(data: Order): Promise<void>
    findById(id: number): Promise<Order | null>
    findAll(params: PaginationParams): Promise<Order[]>
    save(data: Order): Promise<void>
}