import { Order } from "@prisma/client"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { OrderRepository } from "../../repositories/order-repository"
import { Injectable } from "@nestjs/common"
import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address"

export interface GetOrderByIdUseCaseRequest {
    orderId: number
}

export type GetOrderByIdUseCaseResponse = Either<ResourceNotFoundError, {
    order: OrderRecipientAddress
}>

@Injectable()
export class GetOrderByIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(data: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
        const { orderId } = data

        const order = await this.orderRepository.findDetailsById(orderId)

        if(!order) {
            return left(new ResourceNotFoundError)
        }

        return right({
            order
        })
    }
}