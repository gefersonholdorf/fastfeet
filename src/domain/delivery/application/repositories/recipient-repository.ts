import { Recipient } from "../../enterprise/entities/recipient";

export abstract class RecipientRepository {
    abstract create(data: Recipient): Promise<void> 
    abstract findById(id: string): Promise<Recipient | null>
    abstract save(data: Recipient): Promise<void>
}