import { Prisma, User as PrismaUser, Address as PrismaAddress } from "@prisma/client";
import { User } from "../../../../domain/delivery/enterprise/entities/user"
import { Address } from "src/domain/delivery/enterprise/entities/address";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export class PrismaUserMapper {

    static toDomain(prismaUser: PrismaUser, prismaAddress: PrismaAddress): User {
        const address = Address.create({
            street: prismaAddress.street,
            number: prismaAddress.number,
            neighborhood: prismaAddress.neighborhood,
            city: prismaAddress.city,
            state: prismaAddress.state
        }, new UniqueEntityId(prismaAddress.id))

        return User.create({
            name: prismaUser.name,
            email: prismaUser.email,
            cpf: prismaUser.cpf,
            password: prismaUser.password,
            role: prismaUser.role,
            address
        }, new UniqueEntityId(prismaUser.id))
    }

    static toPrisma(user: User): Prisma.UserCreateWithoutOrderInput {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            cpf: user.cpf,
            role: user.role,
            address: {
                create: {
                    street: user.address.street,
                    number: user.address.number,
                    neighborhood: user.address.neighborhood,
                    city: user.address.city,
                    state: user.address.state
                }
            }
        }
    }
}