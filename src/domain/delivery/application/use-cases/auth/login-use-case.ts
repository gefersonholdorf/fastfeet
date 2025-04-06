import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { UnauthorizedError } from "src/core/exceptions/errors/unauthorized-error"
import { UserRepository } from "../../repositories/user-repository"
import { Hashed } from "../../criptography/hashed"
import { Encrypt } from "../../criptography/encrypt"

export interface LoginUseCaseRequest {
    cpf: string
    password: string
}

export type LoginUseCaseResponse = Either<UnauthorizedError, {
    access_token: string
}>

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashedService: Hashed,
        private readonly encryptService: Encrypt
    ) {}

    async execute(data: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
        const {cpf, password} = data

        const existingUserByCpf = await this.userRepository.findByCpf(cpf)

        if(!existingUserByCpf) {
            return left(new UnauthorizedError())
        }

        const isPasswordValid = await this.hashedService.compareHash(password, existingUserByCpf.password)

        if(!isPasswordValid) {
            return left(new UnauthorizedError())
        }

        const token = await this.encryptService.encrypt({
            userId: existingUserByCpf.id.value,
            role: existingUserByCpf.role
        })

        return right({
            access_token: token
        })
    }
}