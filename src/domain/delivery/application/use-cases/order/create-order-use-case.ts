import { left, right, type Either } from "src/core/exceptions/either"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"
import { OrderRepository } from "../../repositories/order-repository"
import { Order } from "src/domain/delivery/enterprise/entities/order"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { UserRepository } from "../../repositories/user-repository"
import { RecipientRepository } from "../../repositories/recipient-repository"

export interface CreateOrderUseCaseRequest {
    userId: number
    recipientId: number
}

export type CreateOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly recipientRepository: RecipientRepository
    ) {}

    async execute(data: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        const {userId, recipientId} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const recipient = await this.recipientRepository.findById(recipientId)

        if(!recipient) {
            return left(new ResourceNotFoundError())
        }


        const order = Order.create({
            userId: new UniqueEntityId(userId), recipientId: new UniqueEntityId(recipientId)
        })

        await this.orderRepository.create(order)

        return right({})
    }
}