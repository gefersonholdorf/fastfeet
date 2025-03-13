import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipientRepository } from '../../../../../tests/repositories/in-memory-recipient-repository'
import { CreateRecipientUseCase } from './create-recipient-use-case'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: CreateRecipientUseCase

describe('Create Recipient [UNIT]', () => {
    beforeEach(() => {
        inMemoryRecipientRepository = new InMemoryRecipientRepository()
        sut = new CreateRecipientUseCase(inMemoryRecipientRepository)
    })

    it('should be able to create a recipient', async () => {
        const result = await sut.execute({
            name: 'Bernardo Souza',
            street: 'Rua Haity',
            number: 235,
            neighborhood: 'Losano',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '89156-000'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryRecipientRepository.items.length).toBe(1)
    })
})