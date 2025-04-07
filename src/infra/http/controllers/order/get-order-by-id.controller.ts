import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { GetOrderByIdUseCase } from "src/domain/delivery/application/use-cases/order/get-order-by-id-use-case";
import { GetOrderByIdPresenter } from "../../presenters/get-order-by-id-presenter";

@Controller('/orders/:id')
export class GetOrderByIdController {
    constructor(private readonly getOrderByIdUseCase: GetOrderByIdUseCase) {}

    @Get()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) id: number) {
        const result = await this.getOrderByIdUseCase.execute({orderId: id})

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }

        return {
            order: GetOrderByIdPresenter.toHttp(result.value.order)
        }
    }
}