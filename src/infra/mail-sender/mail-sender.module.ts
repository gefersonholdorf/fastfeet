import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { EmailService } from "src/domain/notification/application/mail-sender/email-service";
import { EtherealEmailService } from "./nodemailer/ethereal-email.service";

@Module({
    imports: [EnvModule],
    providers: [
        {
            provide: EmailService,
            useClass: EtherealEmailService
        },
    ],
    exports: [EmailService]
})
export class MailSenderModule {}