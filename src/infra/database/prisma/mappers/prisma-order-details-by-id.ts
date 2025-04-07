import { Prisma, Order as prismaOrder, Recipient as prismaRecipient, Address as prismaAddress } from "@prisma/client";
import { ORDERSTATUS } from "src/domain/delivery/enterprise/types/order-status";
import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address";

export interface PrismaOrderRecipientAddress {
    order: prismaOrder,
    recipient: prismaRecipient
    address: prismaAddress
}

export class PrismaOrderDetailsById{
    static toDomain(prismaOrderRecipientAddress: PrismaOrderRecipientAddress): OrderRecipientAddress {
        const orderRecipientAddress = OrderRecipientAddress.create({
            orderId: prismaOrderRecipientAddress.order.id,
            status: prismaOrderRecipientAddress.order.status,
            postedOn: prismaOrderRecipientAddress.order.postedOn,
            pickupDate: prismaOrderRecipientAddress.order.pickupDate,
            deliveryDate: prismaOrderRecipientAddress.order.deliveryDate,
            userId: prismaOrderRecipientAddress.order.userId,
            recipient: {
                name: prismaOrderRecipientAddress.recipient.name,
                address: {
                street: prismaOrderRecipientAddress.address.street,
                number: prismaOrderRecipientAddress.address.number,
                neighborhood: prismaOrderRecipientAddress.address.neighborhood,
                city: prismaOrderRecipientAddress.address.city,
                state: prismaOrderRecipientAddress.address.state
                }
            }
        })

        return orderRecipientAddress
    }
}