import { right, type Either } from "src/core/exceptions/either"
import { UserRepository } from "../../repositories/user-repository"
import { User } from "src/domain/delivery/enterprise/entities/user"

export interface CreateUserUseCaseRequest {
    name: string
    email: string
    cpf: string
    password: string
}

export type CreateUserUseCaseResponse = Either<never, {}>

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(data: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const {name, email, cpf, password} = data

        const user = User.create({
            name, email, cpf, password
        })

        await this.userRepository.create(user)

        return right({})
    }
}