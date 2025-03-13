import { right, type Either } from "../../../../core/errors/either"
import { Recipient } from "../../enterprise/entities/recipient"
import { Address } from "../../enterprise/value-objects/address"
import { RecipientRepository } from "../repositories/recipient-repository"

export interface CreateRecipientUseCaseRequest {
    name: string
    street: string
    number: number
    neighborhood: string
    city: string
    state: string
    zipCode: string
}

export type CreateRecipientUseCaseResponse = Either<never, {}>

export class CreateRecipientUseCase {
    constructor(private recipientRepository: RecipientRepository) {}

    async execute(data: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
        const {name, street, number, neighborhood, city, state, zipCode} = data

        const recipient = Recipient.create({
            name,
            address: Address.create({
                street, number, neighborhood, city, state, zipCode
            })
        })

        await this.recipientRepository.create(recipient)

        return right({})
    }
}