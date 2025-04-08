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

        const communication = Communication.create({
            to, subject, text
        })

        await this.emailService.sendEmail(communication)

        return right({})
    }
}