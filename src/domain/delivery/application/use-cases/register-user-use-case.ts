import { CPFAlreadyExistsUseCaseError } from "../../../../core/errors/cpf-already-exists-error"
import { left, right, type Either } from "../../../../core/errors/either"
import { User, type RoleUser } from "../../enterprise/entities/user"
import { Hasher } from "../cryptography/hasher"
import { UserRepository } from "../repositories/user-repository"

export interface RegisterUserUseCaseRequest {
    name: string,
    email: string,
    cpf: string
    password: string,
    role: string
}

export type RegisterUserUseCaseResponse = Either<CPFAlreadyExistsUseCaseError, {}>

export class RegisterUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private hasher: Hasher,
    ) {}

    async execute(data: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const {name, email, cpf, password, role} = data

        const existsCpfValid = await this.userRepository.findByCpf(cpf)

        if(existsCpfValid) {
            return left(new CPFAlreadyExistsUseCaseError())
        }

        const passwordHahed = await this.hasher.hash(password)

        const userRole: RoleUser = role === 'DELIVERY' ? 'DELIVERY' : 'ADMIN'

        const user = User.create({
            name, email, cpf, password: passwordHahed, role: userRole
        })

        await this.userRepository.create(user)

        return right({})
    }
}