import { RecipientRepository } from "../../repositories/recipient-repository"
import { CreateRecipientUseCase } from "./create-recipient-use-case"
import {describe, beforeEach, it, expect, vi} from 'vitest'

describe('Create Recipient [UNIT]', () => {
    let recipientRepository: RecipientRepository
    let sut: CreateRecipientUseCase
    beforeEach(()=> {
        recipientRepository = {
            create: vi.fn(),
            findById: vi.fn()
        }

        sut = new CreateRecipientUseCase(recipientRepository)
    })

    it('should be able to create a recipient', async() => {
        const newRecipient = {
            name: 'José Almeida',
            address: {
                street: 'Rua 13',
                number: 58,
                neighborhood: 'Bairro 67',
                city: 'São Paulo',
                state: 'SP'
            }
        }

        const result = await sut.execute(newRecipient)

        expect(result.isRight()).toBe(true)
        expect(recipientRepository.create).toHaveBeenCalled()
    })
})