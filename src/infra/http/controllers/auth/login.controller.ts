import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UnauthorizedError } from "src/core/exceptions/errors/unauthorized-error";
import { LoginUseCase } from "src/domain/delivery/application/use-cases/auth/login-use-case";
import { Public } from "src/infra/auth/jwt/is-public";
import { z } from "zod";

const loginSchema = z.object({
    cpf: z.string(),
    password: z.string()
})

type LoginSchema = z.infer<typeof loginSchema>

@ApiTags('auth')
@Controller('/auth/session')
export class LoginController{
    constructor(private readonly loginUseCase: LoginUseCase) {}

    @Public()
    @Post()
    @HttpCode(200)
    async handle(@Body() body: LoginSchema) {
        const {cpf, password} = loginSchema.parse(body)

        const result = await this.loginUseCase.execute({
            cpf, password
        })

        if(result.isLeft()) {
            if(result.value instanceof UnauthorizedError) {
                throw new UnauthorizedException()
            }

            throw new BadRequestException()
        }

        return {
            access_token: result.value.access_token
        }
    }
}