import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { OrderRepository } from "../../repositories/order-repository";
import { FetchOrdersByAddressUseCase } from "./fetch-orders-by-address-use-case";
import { FetchOrdersByUserIdUseCase } from "./fetch-orders-by-user-id-use-case";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Order } from "src/domain/delivery/enterprise/entities/order";

describe('Fetch Orders by user id [UNIT]', () => {
    let orderRepository: Mocked<OrderRepository>
    let sut: FetchOrdersByUserIdUseCase

    beforeEach(() => {
        orderRepository = {
            findAllByUserId: vi.fn(),
        } as unknown as Mocked<OrderRepository>

        sut = new FetchOrdersByUserIdUseCase(orderRepository)
    })

    it('should be able to fetch orders by user id', async() => {
        const fakeOrders = [Order.create({
            orderId: new UniqueEntityId(1),
            status: 'PENDENTE',
            postedOn: new Date(),
            pickupDate: null,
            deliveryDate: null,
            userId: null,
            recipientId: new UniqueEntityId(1)        
        })]

        orderRepository.findAllByUserId.mockResolvedValue(fakeOrders)

        const result = await sut.execute({
            userId: 1,
            page: 1,
            quantityPerPage: 10,
        })
        
        expect(result.isRight()).toBe(true)
    })
})