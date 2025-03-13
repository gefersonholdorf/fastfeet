import { UniqueId } from "../../../../core/entities/unique-id"
import { left, right, type Either } from "../../../../core/errors/either"
import { ResourceNotFoundUseCaseError } from "../../../../core/errors/resource-not-found"
import { Order } from "../../enterprise/entities/order"
import { DeliveryPersonRepository } from "../repositories/delivery-person-repository"
import { OrderRepository } from "../repositories/order-repository"
import { RecipientRepository } from "../repositories/recipient-repository"

export interface CreateOrderUseCaseRequest {
    recipientId: string
    deliveryPersonId: string
}

export type CreateOrderUseCaseResponse = Either<ResourceNotFoundUseCaseError, {}>

export class CreateOrderUseCase {
    constructor(
        private orderRepository: OrderRepository,
        private recipientRepository: RecipientRepository,
        private deliveryPersonRepository: DeliveryPersonRepository
    ) {}

    async execute(data: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        const {recipientId, deliveryPersonId} = data

        const recipient = await this.recipientRepository.findById(recipientId)
        const deliveryPerson = await this.deliveryPersonRepository.findById(deliveryPersonId)

        if(!recipient) {
            return left(new ResourceNotFoundUseCaseError())
        }

        if(!deliveryPerson) {
            return left(new ResourceNotFoundUseCaseError())
        }

        const order = Order.create({
            recipientId: new UniqueId(recipientId),
            deliveryPersonId: new UniqueId(deliveryPersonId)
        })

        await this.orderRepository.create(order)

        return right({})
    }
}