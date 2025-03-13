import { left, right, type Either } from "../../../../core/errors/either"
import { ResourceNotFoundUseCaseError } from "../../../../core/errors/resource-not-found"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientRepository } from "../repositories/recipient-repository"

export interface GetRecipientByIdUseCaseRequest {
    id: string
}
Recipient
export type GetRecipientByIdUseCaseResponse = Either<ResourceNotFoundUseCaseError, {recipient: Recipient}>

export class GetRecipientByIdUseCase {
    constructor(private recipientRepository: RecipientRepository) {}

    async execute(data: GetRecipientByIdUseCaseRequest): Promise<GetRecipientByIdUseCaseResponse> {
        const {id} = data

        const recipient = await this.recipientRepository.findById(id)

        if(!recipient) {
            return left(new ResourceNotFoundUseCaseError())
        }

        return right({
            recipient
        })
    }
}