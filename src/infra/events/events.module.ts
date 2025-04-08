import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { MailSenderModule } from "../mail-sender/mail-sender.module";
import { OnWithdrawnOrder } from "src/domain/notification/application/subscribers/on-withdrawn-order";
import { SendEmailUseCase } from "src/domain/notification/application/use-cases/send-email-use-case";

@Module({
    imports: [DatabaseModule, MailSenderModule],
    providers: [
        OnWithdrawnOrder,
        SendEmailUseCase
    ]
})
export class EventsModule{}