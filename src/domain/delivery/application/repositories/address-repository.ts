import { PaginationParams } from "src/core/repositories/pagination-params";
import { Address } from "../../enterprise/entities/address";

export abstract class AddressRepository {
    abstract create(data: Address): Promise<void>
    abstract findById(id: number): Promise<Address | null>
    abstract findAll(params: PaginationParams): Promise<Address[]>
    abstract save(data: Address): Promise<void>
}