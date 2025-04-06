import { left, right, type Either } from "src/core/exceptions/either"
import { OrderRepository } from "../../repositories/order-repository"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

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

        await this.orderRepository.save(order, order.id.value)

        return right({})
    }
}