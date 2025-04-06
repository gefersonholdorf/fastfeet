import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { CreateRecipientUseCase } from "src/domain/delivery/application/use-cases/recipient/create-recipient-use-case";
import { AuthGuard } from "src/infra/auth/jwt/auth.guard";
import { Roles } from "src/infra/auth/jwt/authorization/roles.decorator";
import { Role } from "src/infra/auth/jwt/authorization/roles.enum";
import { z } from "zod";

const createRecipientSchema = z.object({
    name: z.string(),
    address: z.object({
        street: z.string(),
        number: z.number(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string()
    })  
})

type CreateRecipientSchema = z.infer<typeof createRecipientSchema>

@Controller('/recipients')
export class CreateRecipientController{
    constructor(private readonly createRecipientUseCase: CreateRecipientUseCase) {}

    @Roles(Role.ADMIN)
    @Post()
    @HttpCode(201)
    async handle(@Body() body: CreateRecipientSchema, @Req() req: any) {
        const {name, address} = createRecipientSchema.parse(body)

        await this.createRecipientUseCase.execute({
            name, address
        })
    }
}