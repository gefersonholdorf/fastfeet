import { AccessDeniedUseCaseError } from "../../../../core/errors/access-denied-error"
import { left, right, type Either } from "../../../../core/errors/either"
import { ResourceNotFoundUseCaseError } from "../../../../core/errors/resource-not-found-error"
import { DeliveryPersonRepository } from "../repositories/delivery-person-repository"
import { OrderRepository } from "../repositories/order-repository"

export interface DeliveryDateOrderUseCaseRequest {
    deliveryPersonId: string
    orderId: string
}

export type DeliveryDateOrderUseCaseResponse = Either<ResourceNotFoundUseCaseError | AccessDeniedUseCaseError, {}>

export class DeliveryDateOrderUseCase {
    constructor(
        private orderRepository: OrderRepository,
        private deliveryPersonRepository: DeliveryPersonRepository
    ) {}

    async execute(data: DeliveryDateOrderUseCaseRequest): Promise<DeliveryDateOrderUseCaseResponse> {
        const {deliveryPersonId, orderId} = data

        const deliveryPerson = await this.deliveryPersonRepository.findById(deliveryPersonId)
        const order = await this.orderRepository.findById(orderId)

        if(!deliveryPerson) {
            return left(new ResourceNotFoundUseCaseError())
        }

        if(!order) {
            return left(new ResourceNotFoundUseCaseError())
        }

        if(order.deliveryPersonId.toString !== deliveryPersonId) {
            return left(new AccessDeniedUseCaseError())
        }

        order.deliveryDate = new Date()

        await this.orderRepository.save(order)

        return right({})
    }
}