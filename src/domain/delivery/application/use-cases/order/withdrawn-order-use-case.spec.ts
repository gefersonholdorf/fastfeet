import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { OrderRepository } from "../../repositories/order-repository";
import { WithdrawnOrderUseCase } from "./withdraw-order-use-case";
import { makeOrder } from "test/factory/make-order";

describe('Withdrawn Order [UNIT]', () => {
    let orderRepository: Mocked<OrderRepository>
    let sut: WithdrawnOrderUseCase

    beforeEach(() => {
        orderRepository = {
            findById: vi.fn(),
            save: vi.fn()
        } as unknown as Mocked<OrderRepository>

        sut = new WithdrawnOrderUseCase(orderRepository)
    })

    it('should be able to withdrawn a order', async() => {
        orderRepository.findById.mockResolvedValue(makeOrder())

        const result = await sut.execute({
            userId: 1,
            orderId: 1
        })
        
        expect(result.isRight()).toBe(true)
    })

    it('should be possible to return an error when finding a order with an existing Id', async() => {

        orderRepository.findById.mockResolvedValue(null)

        const result = await sut.execute({
            userId: 2,
            orderId: 1
        })
        
        expect(result.isLeft()).toBe(true)
    })
})