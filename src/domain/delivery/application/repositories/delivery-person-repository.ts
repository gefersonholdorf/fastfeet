import { DeliveryPerson } from "../../enterprise/entities/delivery-person";

export abstract class DeliveryPersonRepository {
    abstract create(data: DeliveryPerson): Promise<void> 
    abstract findById(id: string): Promise<DeliveryPerson | null>
    abstract save(data: DeliveryPerson): Promise<void>
}