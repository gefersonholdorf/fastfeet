import { right, type Either } from "src/core/exceptions/either"
import { AddressRepository } from "../../repositories/address-repository"
import { Address } from "src/domain/delivery/enterprise/entities/address"

export interface CreateAddressUseCaseRequest {
    street: string
    number: number
    neighborhood: string
    city: string
    state: string
}

export type CreateAddressUseCaseResponse = Either<never, {}>

export class CreateAddressUseCase {
    constructor(
        private readonly addressRepository: AddressRepository
    ) {}

    async execute(data: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
        const {street, number, neighborhood, city, state} = data

        const address = Address.create({
            street, number, neighborhood, city, state
        })

        await this.addressRepository.create(address)

        return right({})
    }
}