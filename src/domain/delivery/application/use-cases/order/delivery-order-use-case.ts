import { left, right, type Either } from "src/core/exceptions/either"
import { OrderRepository } from "../../repositories/order-repository"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"

export interface DeliveryOrderUseCaseRequest {
    orderId: number
    filename: string
}

export type DeliveryOrderUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeliveryOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}

    async execute(data: DeliveryOrderUseCaseRequest): Promise<DeliveryOrderUseCaseResponse> {
        const {orderId, filename} = data

        const order = await this.orderRepository.findById(orderId)

        if(!order) {
            return left(new ResourceNotFoundError())
        }

        order.deliveryDate = new Date()
        order.filename = filename

        await this.orderRepository.save(order)

        return right({})
    }
}