import { UniqueId } from "../../src/core/entities/unique-id";
import { DeliveryPerson, type DeliveryPersonProps } from "../../src/domain/delivery/enterprise/entities/delivery-person";

export function makeDeliveryPerson(
    override: Partial<DeliveryPersonProps> = {},
    id?: UniqueId
) {
    const deliveryPerson = DeliveryPerson.create({
        userId: override.userId ?? new UniqueId(),
        ...override
    }, id)

    return deliveryPerson
}