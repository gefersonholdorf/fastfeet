import { Communication } from "../../enterprise/entities/communication";

export abstract class EmailService {
    abstract sendEmail(communication: Communication): Promise<void>
}