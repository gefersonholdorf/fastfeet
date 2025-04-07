import { PaginationParams } from "src/core/repositories/pagination-params";
import { Order } from "../../enterprise/entities/order";
import { OrderRecipientAddress } from "../../enterprise/value-objects/order-recipient-address";

export interface AddressQuery {
    neighborhood: string
}

export abstract class OrderRepository {
    abstract create(order: Order): Promise<void>
    abstract findById(id: number): Promise<Order | null>
    abstract findDetailsById(id: number): Promise<OrderRecipientAddress | null>
    abstract findAllByUserId(userId: number, params: PaginationParams): Promise<Order[]>
    abstract findAllByAddress(userId: number, params: PaginationParams, addressQuery?: AddressQuery): Promise<Order[]>
    abstract save(order: Order, id: number): Promise<void>
}