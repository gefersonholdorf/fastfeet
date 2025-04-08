import { left, right, type Either } from "src/core/exceptions/either"
import { OrderRepository } from "../../repositories/order-repository"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { StorageProvider } from "../../storage/storage-provider"
import { UnauthorizedError } from "src/core/exceptions/errors/unauthorized-error"

export interface DeliveryOrderUseCaseRequest {
    userId: number
    orderId: number
    file: Express.Multer.File
}

export type DeliveryOrderUseCaseResponse = Either<ResourceNotFoundError | UnauthorizedError, {}>

@Injectable()
export class DeliveryOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly storageProvider: StorageProvider
    ) {}

    async execute(data: DeliveryOrderUseCaseRequest): Promise<DeliveryOrderUseCaseResponse> {
        const {userId, orderId, file} = data

        const order = await this.orderRepository.findById(orderId)

        if(!order) {
            return left(new ResourceNotFoundError())
        }

        if(!order.userId) {
            return left(new UnauthorizedError())
        }

        if(userId !== order.userId.value) {
            return left(new UnauthorizedError())
        }

        const filename = await this.storageProvider.upload(file)

        order.deliveryDate = new Date()
        order.filename = filename
        order.status = 'ENTREGUE'

        await this.orderRepository.save(order, order.id.value)

        return right({})
    }
}