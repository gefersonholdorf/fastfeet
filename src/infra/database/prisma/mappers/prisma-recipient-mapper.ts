import { Prisma, Recipient as PrismaRecipient } from "@prisma/client";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Address } from "src/domain/delivery/enterprise/entities/address";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";

export class PrismaRecipientMapper {
    // static toDomain(prismaRecipient: PrismaRecipient): Recipient {
    //     return Recipient.create({
    //         name: prismaRecipient.name,
    //         address: Address.create({
    //             street: prismaRecipient
    //         })
    //     }, 
    //     new UniqueEntityId(prismaRecipient.id)
    //     )
    // }

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