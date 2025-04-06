import { Prisma } from "@prisma/client";
import { Order } from "src/domain/delivery/enterprise/entities/order";

export class PrismaOrderMapper {

    toDomain() {

    }

    toPrisma(order: Order): Prisma.OrderCreateManyInput {
        return {
            status: order.status,
            postedOn: order.postedOn,
            pickupDate: order.pickupDate,
            deliveryDate: order.deliveryDate,
            filename: order.filename,
            userId: order.userId.value,
            recipientId: order.recipientId.value
        }
    }
}