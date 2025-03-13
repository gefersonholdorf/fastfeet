import { UniqueId } from "../../../../core/entities/unique-id"
import { right, type Either } from "../../../../core/errors/either"
import { Order } from "../../enterprise/entities/order"
import { OrderRepository } from "../repositories/order-repository"

export interface CreateOrderUseCaseRequest {
    recipientId: string
    deliveryPersonId: string
}

export type CreateOrderUseCaseResponse = Either<never, {}>

export class CreateOrderUseCase {
    constructor(private orderRepository: OrderRepository) {}

    async execute(data: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        const {recipientId, deliveryPersonId} = data

        const order = Order.create({
            recipientId: new UniqueId(recipientId),
            deliveryPersonId: new UniqueId(deliveryPersonId)
        })

        await this.orderRepository.create(order)

        return right({})
    }
}