import { PaginationParams } from "../../../../core/repositories/pagination-params";
import { QueryAddress } from "../../../../core/repositories/query-address";
import { Order } from "../../enterprise/entities/order";

export abstract class OrderRepository {
    abstract create(data: Order): Promise<void> 
    abstract findById(id: string): Promise<Order | null>
    abstract findManyByUserId(id: string, params: PaginationParams): Promise<Order[]>
    abstract findManyByAddress(query: QueryAddress, params: PaginationParams): Promise<Order[]>
    abstract save(data: Order): Promise<void>
}