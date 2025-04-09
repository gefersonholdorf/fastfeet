import { Controller, Get, HttpCode, Query, Req } from "@nestjs/common";
import { FetchOrdersByUserIdUseCase } from "src/domain/delivery/application/use-cases/order/fetch-orders-by-user-id-use-case";
import { z } from "zod";
import { FetchOrderByUserIdPresenter } from "../../presenters/fetch-order-by-user-id-presenter";
import { ApiTags } from "@nestjs/swagger";

const paginationParamsSchema = z.object({
    page: z.coerce.number().optional().default(1),
    quantityPerPage: z.coerce.number().optional().default(10)
})

type PaginationParams = z.infer<typeof paginationParamsSchema>

@ApiTags('order')
@Controller('/user/orders')
export class FetchOrdersByUserIdController {
    constructor(private readonly fetchOrdersByUserIdUseCase: FetchOrdersByUserIdUseCase) {}

    @Get()
    @HttpCode(200)
    async handle(@Req() req: any, @Query() paramsPagination: PaginationParams) {
        const {userId} = req.user
        const {page, quantityPerPage} = paginationParamsSchema.parse(paramsPagination)

        const result = await this.fetchOrdersByUserIdUseCase.execute({
            userId, 
            page,
            quantityPerPage
        })

        return {
            orders: FetchOrderByUserIdPresenter.toHttp(result.value.orders)
        }
    }
}