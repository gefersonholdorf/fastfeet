// import { left, right, type Either } from "src/core/exceptions/either"
// import { UserRepository } from "../../repositories/user-repository"
// import { User } from "src/domain/delivery/enterprise/entities/user"
// import { Address } from "src/domain/delivery/enterprise/entities/address"
// import { Hashed } from "../../criptography/hashed"
// import { ROLE } from "src/domain/delivery/enterprise/types/role"
// import { Injectable } from "@nestjs/common"
// import { ExistingUserError } from "src/core/exceptions/errors/existing-user"

// export interface UpdatePasswordUserUseCaseRequest {
//     password  
// }

// export type UpdatePasswordUserUseCaseResponse = Either<ExistingUserError, {}>

// @Injectable()
// export class UpdatePasswordUserUseCase {
//     constructor(
//         private readonly userRepository: UserRepository,
//         private readonly hashedService: Hashed
//     ) {}

//     async execute(data: UpdatePasswordUserUseCaseRequest): Promise<UpdatePasswordUserUseCaseResponse> {
//         const {name, email, cpf, password, address, role} = data

//         const existingUserByEmail = await this.userRepository.findByEmail(email)

//         const existingUserByCpf = await this.userRepository.findByCpf(cpf)

//         if(existingUserByEmail || existingUserByCpf){
//             return left(new ExistingUserError())
//         }

//         const newAddress = Address.create({
//             street: address.street,
//             number: address.number,
//             neighborhood: address.neighborhood,
//             city: address.city,
//             state: address.state
//         })

//         const passwordHashed = await this.hashedService.hash(password)

//         const user = User.create({
//             name, email, cpf, role, password: passwordHashed, address: newAddress
//         })

//         await this.userRepository.create(user)

//         return right({})
//     }
// }