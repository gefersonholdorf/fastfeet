import { BadRequestException, Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseIntPipe, Post, Req, UnauthorizedException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { NotFoundError } from "rxjs";
import { UnauthorizedError } from "src/core/exceptions/errors/unauthorized-error";
import { DeliveryOrderUseCase } from "src/domain/delivery/application/use-cases/order/delivery-order-use-case";
import { Roles } from "src/infra/auth/jwt/authorization/roles.decorator";
import { Role } from "src/infra/auth/jwt/authorization/roles.enum";

@ApiTags('order')
@Controller('/orders/delivery/:id')
export class DeliveryOrderController {
    constructor(private readonly deliveryOrderUseCase: DeliveryOrderUseCase) {}

    @Post()
    @HttpCode(200)
    @Roles(Role.ENTREGADOR)
    @UseInterceptors(FileInterceptor('file'))
    async handle(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 50000}),
                new FileTypeValidator({ fileType: /(jpeg|png)$/ })
            ]
        })
    ) file: Express.Multer.File, @Param('id', ParseIntPipe) id: number, @Req() req: any) {

        const {userId} = req.user

        const result = await this.deliveryOrderUseCase.execute({
            userId,
            orderId: id,
            file
        })

        if(result.isLeft()) {
            if(result.value instanceof UnauthorizedError) {
                return new UnauthorizedException()
            }

            if(result.value instanceof NotFoundError) {
                return new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}