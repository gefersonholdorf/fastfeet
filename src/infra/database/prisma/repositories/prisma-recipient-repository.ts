import { PaginationParams } from "src/core/repositories/pagination-params";
import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";
import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(recipient: Recipient): Promise<void> {
        const data = PrismaRecipientMapper.toPrisma(recipient)

        await this.prisma.recipient.create({
            data
        })
    }

    async findById(id: number): Promise<Recipient | null> {
        const recipient = await this.prisma.recipient.findUnique({
            where: {
                id
            },
            include: {
                address: true
            }
        })

        if(!recipient) {
            return null
        }

        return PrismaRecipientMapper.toDomain(recipient, recipient.address)
    }
}