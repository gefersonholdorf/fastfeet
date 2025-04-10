import { Recipient } from "../../enterprise/entities/recipient";
export const RECIPIENT_REPOSITORY = Symbol('RECIPIENT_REPOSITORY');
export abstract class RecipientRepository {
    abstract create(recipient: Recipient): Promise<void>
    abstract findById(id: number): Promise<Recipient | null>
}