import { Order } from "src/domain/delivery/enterprise/entities/order";

export class FetchOrderByUserIdPresenter {
    static toHttp(order: Order[]) {
        return order.map((order) => {
            return {
                orderId: order.id.value,
                userId: order.userId.value,
                status: order.status,
                postedOn: order.postedOn,
                pickupDate: order.pickupDate,
                deliveryDate: order.deliveryDate,
            }
        })
    }
}