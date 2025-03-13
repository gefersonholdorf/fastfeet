import { UniqueId } from "../../src/core/entities/unique-id";
import { Order, type OrderProps } from "../../src/domain/delivery/enterprise/entities/order";

export function makeOrder(
    override: Partial<OrderProps> = {},
    id?: UniqueId
) {
    const order = Order.create({
        recipientId: new UniqueId(),
        deliveryPersonId: new UniqueId(),
        ...override
    }, id)

    return order
}