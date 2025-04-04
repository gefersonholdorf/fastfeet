import { PaginationParams } from "src/core/repositories/pagination-params";
import { Recipient } from "../../enterprise/entities/recipient";

export interface RecipientRepository {
    create(data: Recipient): Promise<void>
    findById(id: number): Promise<Recipient | null>
    findAll(params: PaginationParams): Promise<Recipient[]>
    save(data: Recipient): Promise<void>
}