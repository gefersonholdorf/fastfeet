import { Prisma, Order as PrismaOrder } from "@prisma/client";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Order } from "src/domain/delivery/enterprise/entities/order";

export class PrismaOrderMapper {

    static toDomain(prismaOrder: PrismaOrder): Order {
        return Order.create({
            status: prismaOrder.status,
            postedOn: prismaOrder.postedOn,
            pickupDate: prismaOrder.pickupDate,
            deliveryDate: prismaOrder.deliveryDate,
            filename: prismaOrder.filename,
            userId: prismaOrder.userId ? new UniqueEntityId(prismaOrder.userId) : null,
            recipientId: new UniqueEntityId(prismaOrder.recipientId)
        }, new UniqueEntityId(prismaOrder.id))
    }

    static toPrisma(order: Order): Prisma.OrderCreateManyInput {
        return {
            id: order.id.value,
            status: order.status,
            postedOn: order.postedOn,
            pickupDate: order.pickupDate ?? null,
            deliveryDate: order.deliveryDate ?? null,
            filename: order.filename ?? null,
            userId: order.userId ? order.userId.value : null,
            recipientId: order.recipientId.value
        }
    }
}