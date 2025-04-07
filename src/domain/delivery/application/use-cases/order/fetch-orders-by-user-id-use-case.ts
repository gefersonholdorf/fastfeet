import { Injectable } from "@nestjs/common"
import { Either, right } from "src/core/exceptions/either"
import { Order } from "src/domain/delivery/enterprise/entities/order"
import { OrderRepository } from "../../repositories/order-repository"

export interface FetchOrdersByUserIdUseCaseRequest {
    userId: number
    page: number
    quantityPerPage: number
}

export type FetchOrdersByUserIdUseCaseResponse = Either<never, {
    orders: Order[]
}>

@Injectable()
export class FetchOrdersByUserIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(data: FetchOrdersByUserIdUseCaseRequest): Promise<FetchOrdersByUserIdUseCaseResponse> {
        const {userId, page, quantityPerPage} = data

        const orders = await this.orderRepository.findAllByUserId(userId, {
            page,
            quantityPerPage
        })

        return right({
            orders
        })
    }
}