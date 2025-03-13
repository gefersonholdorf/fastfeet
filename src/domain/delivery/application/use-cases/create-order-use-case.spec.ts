import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipientRepository } from "../../../../../tests/repositories/in-memory-recipient-repository";
import { InMemoryDeliveryPersonRepository } from "../../../../../tests/repositories/in-memory-delivery-person-repository";
import { InMemoryOrderRepository } from "../../../../../tests/repositories/in-memory-order-repository";
import { CreateOrderUseCase } from "./create-order-use-case";
import { makeRecipient } from "../../../../../tests/factories/make-recipient";
import { makeDeliveryPerson } from "../../../../../tests/factories/make-delivery-person";
import { UniqueId } from "../../../../core/entities/unique-id";
import { ResourceNotFoundUseCaseError } from "../../../../core/errors/resource-not-found";

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let sut: CreateOrderUseCase

describe('Create Order [UNIT]', () => {
    beforeEach(() => {
        inMemoryRecipientRepository = new InMemoryRecipientRepository()
        inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
        inMemoryOrderRepository = new InMemoryOrderRepository()
        sut = new CreateOrderUseCase(inMemoryOrderRepository, inMemoryRecipientRepository, inMemoryDeliveryPersonRepository)
    })

    it('should be able to create a order', async() => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))

        const result = await sut.execute({
            deliveryPersonId: 'delivery-01',
            recipientId: 'recipient-01'
        })

        expect(result.isRight()).toBe(true)
    })

    it('should be able to return an error when providing an invalid recipient id', async () => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))
    
            const result = await sut.execute({
                deliveryPersonId: 'delivery-01',
                recipientId: 'recipient-02'
            })
    
            expect(result.isLeft()).toBe(true)
            expect(result.value).toBeInstanceOf(ResourceNotFoundUseCaseError)       
    })

    it('should be able to return an error when providing an invalid delivery person id', async () => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))
    
            const result = await sut.execute({
                deliveryPersonId: 'delivery-02',
                recipientId: 'recipient-01'
            })
    
            expect(result.isLeft()).toBe(true)
            expect(result.value).toBeInstanceOf(ResourceNotFoundUseCaseError)       
    })
})