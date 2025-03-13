import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipientRepository } from "../../../../../tests/repositories/in-memory-recipient-repository";
import { InMemoryDeliveryPersonRepository } from "../../../../../tests/repositories/in-memory-delivery-person-repository";
import { InMemoryOrderRepository } from "../../../../../tests/repositories/in-memory-order-repository";
import { makeRecipient } from "../../../../../tests/factories/make-recipient";
import { makeDeliveryPerson } from "../../../../../tests/factories/make-delivery-person";
import { UniqueId } from "../../../../core/entities/unique-id";
import { ResourceNotFoundUseCaseError } from "../../../../core/errors/resource-not-found-error";
import { makeOrder } from "../../../../../tests/factories/make-order";
import { AccessDeniedUseCaseError } from "../../../../core/errors/access-denied-error";
import { DeliveryDateOrderUseCase } from "./delivery-date-order-use-case";

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let sut: DeliveryDateOrderUseCase

describe('Delivery Date Order [UNIT]', () => {
    beforeEach(() => {
        inMemoryRecipientRepository = new InMemoryRecipientRepository()
        inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
        inMemoryOrderRepository = new InMemoryOrderRepository()
        sut = new DeliveryDateOrderUseCase(inMemoryOrderRepository, inMemoryDeliveryPersonRepository)
    })

    it('should be able to delivery date a order', async() => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))

        await inMemoryOrderRepository.create(makeOrder({recipientId: new UniqueId('recipient-01'), deliveryPersonId: new UniqueId('delivery-01')}, new UniqueId('order-01')))

        const result = await sut.execute({
            deliveryPersonId: 'delivery-01',
            orderId: 'order-01'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryOrderRepository.items[0].deliveryDate).not.toBeNull()
    })

    it('should be able to return an error when providing an invalid delivery person id', async () => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))

        await inMemoryOrderRepository.create(makeOrder({recipientId: new UniqueId('recipient-01'), deliveryPersonId: new UniqueId('delivery-01')}, new UniqueId('order-01')))

        const result = await sut.execute({
            deliveryPersonId: 'delivery-02',
            orderId: 'order-01'
        })
    
            expect(result.isLeft()).toBe(true)
            expect(result.value).toBeInstanceOf(ResourceNotFoundUseCaseError)       
    })

    it('should be able to return an error when providing a courier other than the order courier', async () => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-02')))

        await inMemoryOrderRepository.create(makeOrder({recipientId: new UniqueId('recipient-01'), deliveryPersonId: new UniqueId('delivery-01')}, new UniqueId('order-01')))

        const result = await sut.execute({
            deliveryPersonId: 'delivery-02',
            orderId: 'order-01'
        })
    
            expect(result.isLeft()).toBe(true)
            expect(result.value).toBeInstanceOf(AccessDeniedUseCaseError)       
    })

    it('should be able to return an error when providing an invalid order id', async () => {
        await inMemoryRecipientRepository.create(makeRecipient({}, new UniqueId('recipient-01')))
        await inMemoryDeliveryPersonRepository.create(makeDeliveryPerson({}, new UniqueId('delivery-01')))

        await inMemoryOrderRepository.create(makeOrder({recipientId: new UniqueId('recipient-01'), deliveryPersonId: new UniqueId('delivery-01')}, new UniqueId('order-01')))

        const result = await sut.execute({
            deliveryPersonId: 'delivery-01',
            orderId: 'order-02'
        })
    
            expect(result.isLeft()).toBe(true)
            expect(result.value).toBeInstanceOf(ResourceNotFoundUseCaseError)       
    })
})