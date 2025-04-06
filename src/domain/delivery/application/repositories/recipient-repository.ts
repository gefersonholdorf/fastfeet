import { PaginationParams } from "src/core/repositories/pagination-params";
import { Recipient } from "../../enterprise/entities/recipient";

export abstract class RecipientRepository {
    abstract create(recipient: Recipient): Promise<void>
    abstract findById(id: number): Promise<Recipient | null>
    abstract findAll(params: PaginationParams): Promise<Recipient[]>
    abstract save(recipient: Recipient): Promise<void>
}