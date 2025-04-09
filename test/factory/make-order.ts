import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Order } from "src/domain/delivery/enterprise/entities/order";

export function makeOrder() {
    return Order.create({
        recipientId: new UniqueEntityId(2)
    })
}