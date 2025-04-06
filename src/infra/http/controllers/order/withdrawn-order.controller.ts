import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { WithdrawnOrderUseCase } from "src/domain/delivery/application/use-cases/order/withdraw-order-use-case";
import { Roles } from "src/infra/auth/jwt/authorization/roles.decorator";
import { Role } from "src/infra/auth/jwt/authorization/roles.enum";

@Controller('/orders/withdrawn/:id')
export class WithdrawnOrderController{
    constructor(private readonly withdrawnOrderUseCase: WithdrawnOrderUseCase) {}

    @Roles(Role.ENTREGADOR)
    @Post()
    @HttpCode(200)
    async handle(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.userId

        const result = await this.withdrawnOrderUseCase.execute({
            orderId: id, userId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}