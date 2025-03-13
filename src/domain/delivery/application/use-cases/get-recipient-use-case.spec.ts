import { beforeEach, describe, expect, it } from 'vitest'
import { makeRecipient } from '../../../../../tests/factories/make-recipient'
import { InMemoryRecipientRepository } from '../../../../../tests/repositories/in-memory-recipient-repository'
import { UniqueId } from '../../../../core/entities/unique-id'
import { ResourceNotFoundUseCaseError } from '../../../../core/errors/resource-not-found'
import { GetRecipientByIdUseCase } from './get-recipient-by-id-use-case'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: GetRecipientByIdUseCase

describe('Get Recipient by id [UNIT]', () => {
    beforeEach(() => {
        inMemoryRecipientRepository = new InMemoryRecipientRepository()
        sut = new GetRecipientByIdUseCase(inMemoryRecipientRepository)
    })

    it('should be able to find recipient by id', async () => {
        const recipient = makeRecipient({}, new UniqueId('recipient-01'))

        await inMemoryRecipientRepository.create(recipient)

        const result = await sut.execute({id: 'recipient-01'})

        expect(result.isRight()).toBe(true)       
    })

    it('should be able to return an error when providing an invalid id', async () => {
        const recipient = makeRecipient({}, new UniqueId('recipient-01'))

        await inMemoryRecipientRepository.create(recipient)

        const result = await sut.execute({id: 'recipient-02'})

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundUseCaseError)       
    })
})