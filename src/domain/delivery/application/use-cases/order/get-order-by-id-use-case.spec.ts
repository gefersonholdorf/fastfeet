import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { OrderRepository } from "../../repositories/order-repository";
import { GetOrderByIdUseCase } from "./get-order-by-id-use-case";

describe('Get Order by Id [UNIT]', () => {
    let orderRepository: Mocked<OrderRepository>
    let sut: GetOrderByIdUseCase

    beforeEach(() => {
        orderRepository = {
            findDetailsById: vi.fn(),
        } as unknown as Mocked<OrderRepository>

        sut = new GetOrderByIdUseCase(orderRepository)
    })

    it('should be able to get by id a order', async() => {
        const fakeOrderRecipientAddress = OrderRecipientAddress.create({
            orderId: 2,
            status: 'PENDENTE',
            postedOn: new Date(),
            pickupDate: null,
            deliveryDate: null,
            userId: 1,
            recipient: {
                name: 'Liandro',
                address: {
                street: 'rua',
                number: 233,
                neighborhood:'bairro',
                city: 'cidade',
                state: 'estado'
                }
            }
        })
        orderRepository.findDetailsById.mockResolvedValue(fakeOrderRecipientAddress)

        const result = await sut.execute({
            orderId: 1
        })
        
        expect(result.isRight()).toBe(true)
    })

    it('should be possible to return an error when finding a order with an existing Id', async() => {

        orderRepository.findDetailsById.mockResolvedValue(null)

        const result = await sut.execute({
            orderId: 2
        })
        
        expect(result.isLeft()).toBe(true)
    })
})