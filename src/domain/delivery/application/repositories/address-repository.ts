import { PaginationParams } from "src/core/repositories/pagination-params";
import { Address } from "../../enterprise/entities/address";

export interface AddressRepository {
    create(data: Address): Promise<void>
    findById(id: number): Promise<Address | null>
    findAll(params: PaginationParams): Promise<Address[]>
    save(data: Address): Promise<void>
}