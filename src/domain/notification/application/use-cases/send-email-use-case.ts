import { Injectable } from "@nestjs/common"
import { Either, right } from "src/core/exceptions/either"
import { EmailService } from "../mail-sender/email-service"
import { Communication } from "../../enterprise/entities/communication"

export interface SendEmailUseCaseRequest {
    to: string
    subject: string
    text: string
}

export type SendEmailUseCaseResponse = Either<never, {}>

@Injectable()
export class SendEmailUseCase {
    constructor(private readonly emailService: EmailService) {}

    async execute(data: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
        const {to, subject, text} = data

        console.log('Entrou no use case de envio de e-mail')

        const communication = Communication.create({
            to, subject, text
        })

        try {
            await this.emailService.sendEmail(communication)

            console.log('E-mail enviado com sucesso!')
        } catch (error) {
            console.log('Não enviou o e-mail')
            console.log(error)
        }

        return right({})
    }
}