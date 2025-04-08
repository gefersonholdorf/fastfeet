import { left, right, type Either } from "src/core/exceptions/either"
import { OrderRepository } from "../../repositories/order-repository"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { Order } from "src/domain/delivery/enterprise/entities/order"

export interface WithdrawnOrderUseCaseRequest {
    orderId: number
    userId: number
}

export type WithdrawnOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class WithdrawnOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}

    async execute(data: WithdrawnOrderUseCaseRequest): Promise<WithdrawnOrderUseCaseResponse> {
        const {orderId, userId} = data

        const order = await this.orderRepository.findById(orderId)

        if(!order) {
            return left(new ResourceNotFoundError())
        }

        order.pickupDate = new Date()
        order.userId = new UniqueEntityId(userId)
        order.status = 'RETIRADO'

        const updateOrder = Order.create({
            status: order.status,
            postedOn: order.postedOn,
            pickupDate: order.pickupDate,
            deliveryDate: order.deliveryDate,
            filename: order.filename,
            userId: order.userId,
            recipientId: order.recipientId,
        }, order.id)

        await this.orderRepository.save(updateOrder, order.id.value)

        return right({})
    }
}