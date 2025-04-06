import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from "@nestjs/common";
import { ExistingUserError } from "src/core/exceptions/errors/existing-user";
import { CreateUserUseCase } from "src/domain/delivery/application/use-cases/user/create-user-use-case";
import { z } from "zod";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'ENTREGADOR']).optional().default('ADMIN'),
    address: z.object({
        street: z.string(),
        number: z.number(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string()
    })  
})

type CreateUserSchema = z.infer<typeof createUserSchema>

@Controller('/users')
export class CreateUserController{
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post()
    @HttpCode(201)
    async handle(@Body() body: CreateUserSchema) {
        const {name, address, email, password, cpf, role} = createUserSchema.parse(body)

        const result = await this.createUserUseCase.execute({
            name, email, password, cpf, address, role
        })

        if(result.isLeft()) {
            if(result.value instanceof ExistingUserError) {
                throw new ConflictException()
            }

            throw new BadRequestException()
        }
    }
}