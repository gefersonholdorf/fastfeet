import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { CreateOrderUseCase } from "./create-order-use-case";
import { OrderRepository } from "../../repositories/order-repository";
import { RecipientRepository } from "../../repositories/recipient-repository";
import { makeRecipient } from "test/factory/make-recipient";

describe('Create Order [UNIT]', () => {
    let orderRepository: Mocked<OrderRepository>
    let recipientRepository: Mocked<RecipientRepository>
    let sut: CreateOrderUseCase

    beforeEach(() => {
        orderRepository = {
            create: vi.fn()
        } as unknown as Mocked<OrderRepository>

        recipientRepository = {
            findById: vi.fn()
        } as unknown as Mocked<RecipientRepository>

        sut = new CreateOrderUseCase(orderRepository, recipientRepository)
    })

    it('should be able to create order', async() => {
        recipientRepository.findById.mockResolvedValue(makeRecipient())

        const result = await sut.execute({
            recipientId: 2
        })
        
        expect(result.isRight()).toBe(true)
    })

    it('should be possible to return an error when finding a recipient with an existing Id', async() => {
        recipientRepository.findById.mockResolvedValue(null)

        const result = await sut.execute({
            recipientId: 2
        })

        console.log(result)
        
        expect(result.isLeft()).toBe(true)
    })
})