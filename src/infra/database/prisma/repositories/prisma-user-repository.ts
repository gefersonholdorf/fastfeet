import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { UserRepository } from "src/domain/delivery/application/repositories/user-repository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { PrismaService } from "../prisma.service";
import { User } from "src/domain/delivery/enterprise/entities/user";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await this.prisma.user.create({data})
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                address: true
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user, user.address)
    }

    async findByCpf(cpf: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf
            },
            include: {
                address: true
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user, user.address)
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                address: true
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user, user.address)
    }

    async save(user: User, id: number): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await this.prisma.user.update(
            {
                data,
                where: {
                    id
                }
            }
        )
    }

}