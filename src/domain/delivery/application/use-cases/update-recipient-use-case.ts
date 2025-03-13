import { left, right, type Either } from "../../../../core/errors/either"
import { ResourceNotFoundUseCaseError } from "../../../../core/errors/resource-not-found-error"
import { Recipient } from "../../enterprise/entities/recipient"
import { RecipientRepository } from "../repositories/recipient-repository"

export interface UpdateRecipientUseCaseRequest {
    id: string,
    name?: string
    street?: string
    number?: number
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
}
Recipient
export type UpdateRecipientUseCaseResponse = Either<ResourceNotFoundUseCaseError, {}>

export class UpdateRecipientUseCase {
    constructor(private recipientRepository: RecipientRepository) {}

    async execute(data: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse> {
        const {id, name, street, number, neighborhood, city, state, zipCode} = data

        const recipient = await this.recipientRepository.findById(id)

        if(!recipient) {
            return left(new ResourceNotFoundUseCaseError())
        }

        if(name !== undefined) recipient.props.name = name
        if(street !== undefined) recipient.props.address.props.street = street
        if(number !== undefined) recipient.props.address.props.number = number
        if(neighborhood !== undefined) recipient.props.address.props.neighborhood = neighborhood
        if(city !== undefined) recipient.props.address.props.city = city
        if(state !== undefined) recipient.props.address.props.state = state
        if(zipCode !== undefined) recipient.props.address.props.zipCode = zipCode

        await this.recipientRepository.save(recipient)

        return right({})
    }
}