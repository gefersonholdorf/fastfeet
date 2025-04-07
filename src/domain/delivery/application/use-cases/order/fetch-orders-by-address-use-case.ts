import { Injectable } from "@nestjs/common"
import { Either, right } from "src/core/exceptions/either"
import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address"
import { OrderRepository } from "../../repositories/order-repository"

export interface FetchOrdersByAddressUseCaseRequest {
    userId: number
    page: number
    quantityPerPage: number,
    neighborhood?: string
}

export type FetchOrdersByAddressUseCaseResponse = Either<never, {
    orders: OrderRecipientAddress[]
}>

@Injectable()
export class FetchOrdersByAddressUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(data: FetchOrdersByAddressUseCaseRequest): Promise<FetchOrdersByAddressUseCaseResponse> {
        const {userId, page, quantityPerPage, neighborhood} = data

        const orders = await this.orderRepository.findAllByAddress(userId, {
            page,
            quantityPerPage
        }, 
        {
            neighborhood
        })

        return right({
            orders
        })
    }
}