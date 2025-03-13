import { AccessDeniedUseCaseError } from "../../../../core/errors/access-denied-error"
import { left, right, type Either } from "../../../../core/errors/either"
import { Encrypter } from "../cryptography/encrypter"
import { Hasher } from "../cryptography/hasher"
import { UserRepository } from "../repositories/user-repository"

export interface AuthenticateUseCaseRequest {
    cpf: string
    password: string
}

export type AuthenticateUseCaseResponse = Either<AccessDeniedUseCaseError, {access_token: string}>

export class AuthenticateUseCase {
    constructor(
        private userRepository: UserRepository,
        private hasher: Hasher,
        private encrypter: Encrypter
    ) {}

    async execute(data: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const {cpf, password} = data

        const existsCpfValid = await this.userRepository.findByCpf(cpf)

        if(!existsCpfValid) {
            return left(new AccessDeniedUseCaseError())
        }

        const passwordIsValid = await this.hasher.compare(password, existsCpfValid.password)

        if(!passwordIsValid) {
            return left(new AccessDeniedUseCaseError())
        }

        const token = await this.encrypter.encrypt({sub: existsCpfValid.id})

        return right({
            access_token: token
        })
    }
}