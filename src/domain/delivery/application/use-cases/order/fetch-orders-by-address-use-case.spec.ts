import { OrderRecipientAddress } from "src/domain/delivery/enterprise/value-objects/order-recipient-address";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { OrderRepository } from "../../repositories/order-repository";
import { FetchOrdersByAddressUseCase } from "./fetch-orders-by-address-use-case";

describe('Fetch Orders by Address [UNIT]', () => {
    let orderRepository: Mocked<OrderRepository>
    let sut: FetchOrdersByAddressUseCase

    beforeEach(() => {
        orderRepository = {
            findAllByAddress: vi.fn(),
        } as unknown as Mocked<OrderRepository>

        sut = new FetchOrdersByAddressUseCase(orderRepository)
    })

    it('should be able to fetch frders by address', async() => {
        const fakeOrders = [OrderRecipientAddress.create({
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
        })]

        orderRepository.findAllByAddress.mockResolvedValue(fakeOrders)

        const result = await sut.execute({
            userId: 1,
            page: 1,
            quantityPerPage: 10,
        })
        
        expect(result.isRight()).toBe(true)
    })
})