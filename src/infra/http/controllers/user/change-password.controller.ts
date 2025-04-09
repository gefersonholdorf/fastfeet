import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { ChangePasswordUseCase } from "src/domain/delivery/application/use-cases/user/change-password-use-case";
import { Roles } from "src/infra/auth/jwt/authorization/roles.decorator";
import { Role } from "src/infra/auth/jwt/authorization/roles.enum";
import { z } from "zod";

const changePasswordSchema = z.object({
    password: z.string()
})

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

@ApiTags('user')
@Controller('/change-password')
export class ChangePasswordController {
    constructor(
        private readonly changePasswordUseCase: ChangePasswordUseCase
    ){}

    @Post()
    @HttpCode(200)
    @Roles(Role.ADMIN)
    async handle(@Req() req: any, @Body() body: ChangePasswordSchema) {
        const {userId} = req.user
        const {password} = changePasswordSchema.parse(body)

        const result = await this.changePasswordUseCase.execute({userId, password})

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException()
            }

            throw new BadRequestException()
        }
    }
}