import { Prisma, Recipient as PrismaRecipient, Address as PrismaAddress} from "@prisma/client";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Address } from "src/domain/delivery/enterprise/entities/address";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";

export class PrismaRecipientMapper {

    static toDomain(prismaRecipient: PrismaRecipient, prismaAddress: PrismaAddress): Recipient {
        const address = Address.create({
            street: prismaAddress.street,
            number: prismaAddress.number,
            neighborhood: prismaAddress.neighborhood,
            city: prismaAddress.city,
            state: prismaAddress.state
        }, new UniqueEntityId(prismaAddress.id))

        return Recipient.create({
            name: prismaRecipient.name,
            address
        }, 
        new UniqueEntityId(prismaRecipient.id)
        )
    }

    static toPrisma(recipient: Recipient): Prisma.RecipientCreateWithoutOrderInput {
        return {
            name: recipient.name,
            address: {
                create: {
                    street: recipient.address.street,
                    number: recipient.address.number,
                    neighborhood: recipient.address.neighborhood,
                    city: recipient.address.city,
                    state: recipient.address.state
                }
            }
        }
    }
}