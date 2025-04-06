import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository";
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository";
import { UserRepository } from "src/domain/delivery/application/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";

@Module({
    imports: [],
    providers: [PrismaService,
        {
            provide: RecipientRepository,
            useClass: PrismaRecipientRepository
        },
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        }
    ],
    exports: [PrismaService, RecipientRepository, UserRepository]
})
export class DatabaseModule{}