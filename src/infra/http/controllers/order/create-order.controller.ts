import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Post } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { CreateOrderUseCase } from "src/domain/delivery/application/use-cases/order/create-order-use-case";
import { Roles } from "src/infra/auth/jwt/authorization/roles.decorator";
import { Role } from "src/infra/auth/jwt/authorization/roles.enum";
import { z } from "zod";

const createOrderSchema = z.object({
    recipientId: z.coerce.number()
})

type CreateOrderSchema = z.infer<typeof createOrderSchema>

@Controller('/orders')
export class CreateOrderController{
    constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

    @Roles(Role.ADMIN)
    @Post()
    @HttpCode(201)
    async handle(@Body() body: CreateOrderSchema) {
        const {recipientId} = createOrderSchema.parse(body)

        const result = await this.createOrderUseCase.execute({
            recipientId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}