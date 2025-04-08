import { Injectable } from "@nestjs/common"
import { Either, left, right } from "src/core/exceptions/either"
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error"
import { UserRepository } from "../../repositories/user-repository"
import { Hashed } from "../../criptography/hashed"

export interface ChangePasswordUseCaseRequest {
    userId: number
    password: string
}

export type ChangePasswordUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashedService: Hashed
    ) {}

    async execute(data: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
        const {userId, password} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const passwordHashed = await this.hashedService.hash(password)

        user.password = passwordHashed

        await this.userRepository.save(user, userId)

        return right({})
    }
}