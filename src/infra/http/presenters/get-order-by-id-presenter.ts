import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address";

export class GetOrderByIdPresenter {
    static toHttp(order: OrderRecipientAddress) {
        return {
            orderId: order.orderId,
            userId: order.userId,
            status: order.status,
            postedOn: order.postedOn,
            pickupDate: order.pickupDate,
            deliveryDate: order.deliveryDate,
            recipientName: order.recientName,
            street: order.street,
            number: order.number,
            neighborhood: order.neighborhood,
            city: order.city,
            state: order.state
        }
    }
}