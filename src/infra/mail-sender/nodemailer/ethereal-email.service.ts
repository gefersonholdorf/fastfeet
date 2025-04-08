import { Injectable } from "@nestjs/common";
import { EmailService } from "src/domain/notification/application/mail-sender/email-service";
import { Communication } from "src/domain/notification/enterprise/entities/communication";
import * as nodemailer from 'nodemailer'
import { EnvService } from "src/infra/env/env.service";

@Injectable()
export class EtherealEmailService implements EmailService {
    private transporter: nodemailer.Transporter

    constructor(private readonly envService: EnvService){
        this.transporter = nodemailer.createTransport({
            host: this.envService.get('EMAIL_HOST'),
            port: this.envService.get('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.envService.get('EMAIL_USER'),
                pass: this.envService.get('EMAIL_PASS')
            }
        })
    }

    async sendEmail(communication: Communication): Promise<void> {
        await this.transporter.sendMail({
            from: this.envService.get('EMAIL_DEFAULT'),
            to: communication.to,
            subject: communication.subject,
            text: communication.text
        })
    }
}