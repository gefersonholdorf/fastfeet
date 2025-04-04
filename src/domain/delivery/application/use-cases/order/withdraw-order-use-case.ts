import { left, right, type Either } from "src/core/exceptions/either"
import { OrderRepository } from "../../repositories/order-repository"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"

export interface WithdrawnOrderUseCaseRequest {
    orderId: number
}

export type WithdrawnOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class WithdrawnOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}

    async execute(data: WithdrawnOrderUseCaseRequest): Promise<WithdrawnOrderUseCaseResponse> {
        const {orderId} = data

        const order = await this.orderRepository.findById(orderId)

        if(!order) {
            return left(new ResourceNotFoundError())
        }

        order.pickupDate = new Date()

        await this.orderRepository.save(order)

        return right({})
    }
}