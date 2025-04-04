import { right, type Either } from "src/core/exceptions/either"
import { RecipientRepository } from "../../repositories/recipient-repository"
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient"
import { UniqueEntityId } from "src/core/entities/unique-entity-id"

export interface CreateRecipientUseCaseRequest {
    name: string
    addressId: number
}

export type CreateRecipientUseCaseResponse = Either<never, {}>

export class CreateRecipientUseCase {
    constructor(
        private readonly recipientRepository: RecipientRepository,
    ) {}

    async execute(data: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
        const {name, addressId} = data

        const recipient = Recipient.create({
            name, addressId: new UniqueEntityId(addressId)
        })

        await this.recipientRepository.create(recipient)

        return right({})
    }
}