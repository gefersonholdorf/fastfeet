import { PaginationParams } from "src/core/repositories/pagination-params";
import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";
import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(recipient: Recipient): Promise<void> {
        const data = PrismaRecipientMapper.toPrisma(recipient)

        await this.prisma.recipient.create({
            data
        })
    }

    findById(id: number): Promise<Recipient | null> {
        throw new Error("Method not implemented.");
    }
    findAll(params: PaginationParams): Promise<Recipient[]> {
        throw new Error("Method not implemented.");
    }
    save(recipient: Recipient): Promise<void> {
        throw new Error("Method not implemented.");
    }
}