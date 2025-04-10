import { Module } from "@nestjs/common";
import { RecipientRepository } from "src/domain/delivery/application/repositories/recipient-repository";
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository";
import { UserRepository } from "src/domain/delivery/application/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { OrderRepository } from "src/domain/delivery/application/repositories/order-repository";
import { PrismaOrderRepository } from "./prisma/repositories/prisma-order-repository";
import { PrismaService } from "./prisma/prisma.service";

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
        },
        {
            provide: OrderRepository,
            useClass: PrismaOrderRepository
        }
    ],
    exports: [PrismaService, RecipientRepository, UserRepository, OrderRepository]
})
export class DatabaseModule{}