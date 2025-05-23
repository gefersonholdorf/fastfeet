import { left, right, type Either } from "src/core/exceptions/either"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { OrderRepository } from "../../repositories/order-repository"
import { Order } from "src/domain/delivery/enterprise/entities/order"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { RecipientRepository } from "../../repositories/recipient-repository"
import { Injectable } from "@nestjs/common"

export interface CreateOrderUseCaseRequest {
    recipientId: number
}

export type CreateOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly recipientRepository: RecipientRepository
    ) {}

    async execute(data: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        const {recipientId} = data

        const recipient = await this.recipientRepository.findById(recipientId)

        if(!recipient) {
            return left(new ResourceNotFoundError())
        }

        const order = Order.create({
            recipientId: new UniqueEntityId(recipientId)
        })

        await this.orderRepository.create(order)

        return right({})
    }
}