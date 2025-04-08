import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { OrderRepository, type AddressQuery } from "src/domain/delivery/application/repositories/order-repository";
import { Order } from "src/domain/delivery/enterprise/entities/order";
import { PrismaService } from "../prisma.service";
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper";
import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address";
import { PrismaOrderDetailsById } from "../mappers/prisma-order-details-by-id";
import { DomainEvents } from "src/core/events/domain-events";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(order: Order): Promise<void> {
        const data = PrismaOrderMapper.toPrisma(order)

        await this.prisma.order.create({data})
    }

    async findById(id: number): Promise<Order | null> {
        const order = await this.prisma.order.findUnique({
            where: {
                id
            }
        })
        
        if(!order) {
            return null
        }
        
        return PrismaOrderMapper.toDomain(order)
    }

    async findDetailsById(id: number): Promise<OrderRecipientAddress | null> {
        const order = await this.prisma.order.findFirst({
            where: {
                id
            },
            include: {
                recipient: {
                    include: {
                        address: true
                    }
                }
            },
        })

        if(!order) {
            return null
        }

        return PrismaOrderDetailsById.toDomain({
            order: {
                id: order.id,
                status: order.status,
                postedOn: order.postedOn,
                pickupDate: order.pickupDate,
                deliveryDate: order.deliveryDate,
                userId: order.userId,
                recipientId: order.recipientId,
                filename: order.filename
            },
            recipient: order.recipient,
            address: order.recipient.address
        })
    }

    async findAllByUserId(userId: number, params: PaginationParams): Promise<Order[]> {
        const {page, quantityPerPage} = params
        const orders = await this.prisma.order.findMany({
            where: {
                userId
            },
            skip: (page - 1) * quantityPerPage,
            take: quantityPerPage
            
        })

        return orders.map((order) => {
            return PrismaOrderMapper.toDomain(order)
        })
    }

    async findAllByAddress(userId: number, params: PaginationParams, addressQuery?: AddressQuery): Promise<OrderRecipientAddress[]> {

        const {page, quantityPerPage} = params
        let neighborhood: string;

        const neighborhoodUser = await this.prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
             address: true
            }
        })
    
        if(!neighborhoodUser) {
                throw new Error()
        }
            
        neighborhood = neighborhoodUser.address.neighborhood
        
        const orders = await this.prisma.order.findMany({
            where: {
                recipient: {
                    address: {
                        neighborhood: addressQuery ? addressQuery.neighborhood : neighborhood
                    }
                }
            },
            skip: (page - 1) * quantityPerPage,
            take: quantityPerPage,
            include: {
                recipient: {
                    include: {
                        address: true
                    }
                }
            }
        })

        return orders.map((order) => {
            return PrismaOrderDetailsById.toDomain({
                order: {
                    id: order.id,
                    status: order.status,
                    postedOn: order.postedOn,
                    pickupDate: order.pickupDate,
                    deliveryDate: order.deliveryDate,
                    userId: order.userId,
                    recipientId: order.recipientId,
                    filename: order.filename
                },
                recipient: order.recipient,
                address: order.recipient.address
            })
        })

    }

    async save(order: Order, id: number): Promise<void> {
        const data = PrismaOrderMapper.toPrisma(order)

        await this.prisma.order.update(
            {
                data, 
                where: {
                    id
                }
            }
        )

        DomainEvents.dispatchEventsForAggregate(order.id)
    }

}