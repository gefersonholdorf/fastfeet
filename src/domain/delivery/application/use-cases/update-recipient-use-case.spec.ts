import { beforeEach, describe, expect, it } from 'vitest'
import { makeRecipient } from '../../../../../tests/factories/make-recipient'
import { InMemoryRecipientRepository } from '../../../../../tests/repositories/in-memory-recipient-repository'
import { UniqueId } from '../../../../core/entities/unique-id'
import { ResourceNotFoundUseCaseError } from '../../../../core/errors/resource-not-found'
import { UpdateRecipientUseCase } from './update-recipient-use-case'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: UpdateRecipientUseCase

describe('Update Recipient [UNIT]', () => {
    beforeEach(() => {
        inMemoryRecipientRepository = new InMemoryRecipientRepository()
        sut = new UpdateRecipientUseCase(inMemoryRecipientRepository)
    })

    it('should be able to update recipient by id', async () => {
        const recipient = makeRecipient({}, new UniqueId('recipient-01'))

        await inMemoryRecipientRepository.create(recipient)

        const result = await sut.execute({id: 'recipient-01', name: 'Almeidinha', number: 500})

        expect(result.isRight()).toBe(true)
        expect(inMemoryRecipientRepository.items[0].name).toEqual('Almeidinha') 
        expect(inMemoryRecipientRepository.items[0].address.number).toEqual(500)  
    })

    it('should be able to return an error when providing an invalid id', async () => {
        const recipient = makeRecipient({}, new UniqueId('recipient-01'))

        await inMemoryRecipientRepository.create(recipient)

        const result = await sut.execute({id: 'recipient-02'})

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundUseCaseError)       
    })
})