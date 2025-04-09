import { Controller, Get, HttpCode, ParseIntPipe, Query, Req } from "@nestjs/common";
import { FetchOrdersByAddressUseCase } from "src/domain/delivery/application/use-cases/order/fetch-orders-by-address-use-case";
import { z } from "zod";
import { GetOrderByIdPresenter } from "../../presenters/get-order-by-id-presenter";
import { ApiTags } from "@nestjs/swagger";

const paginationParamsSchema = z.object({
    page: z.coerce.number().optional().default(1),
    quantityPerPage: z.coerce.number().optional().default(10)
})

const addressQuerySchema = z.object({
    neighborhood: z.string().optional()
})

const querySchema = paginationParamsSchema.merge(addressQuerySchema)

type QuerySchema = z.infer<typeof querySchema>

@ApiTags('order')
@Controller('/orders')
export class FetchOrderByAddressController {
    constructor(private readonly fetchOrderByAddressUseCase: FetchOrdersByAddressUseCase) {}

    @Get()
    @HttpCode(200)
    async handle(@Req() req: any, @Query() queryParams: QuerySchema) {
        const {userId} = req.user
        const {page, quantityPerPage, neighborhood} = querySchema.parse(queryParams)

        const orders = await this.fetchOrderByAddressUseCase.execute({
            userId, page, quantityPerPage, neighborhood
        })

        const ordersHttp = orders.value.orders.map((order) => {
            return GetOrderByIdPresenter.toHttp(order)
        })

        return {
            orders: ordersHttp
        }
    }
}