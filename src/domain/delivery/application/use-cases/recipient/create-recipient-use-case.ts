import { right, type Either } from "../../../../../core/exceptions/either"
import { RecipientRepository } from "../../repositories/recipient-repository"
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient"
import { Address } from "src/domain/delivery/enterprise/entities/address"
import { Injectable } from "@nestjs/common"

export interface CreateRecipientUseCaseRequest {
    name: string
    address: {
        street: string
        number: number
        neighborhood: string
        city: string
        state: string
    }
}

export type CreateRecipientUseCaseResponse = Either<never, {}>

@Injectable()
export class CreateRecipientUseCase {
    constructor(
        private readonly recipientRepository: RecipientRepository,
    ) {}

    async execute(data: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
        const {name, address} = data

        const newAddress = Address.create({
            street: address.street,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state
        })

        const recipient = Recipient.create({
            name, address: newAddress
        })

        await this.recipientRepository.create(recipient)

        return right({})
    }
}