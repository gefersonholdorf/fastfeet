import { Entity } from "../../../../core/entities/entity";
import type { UniqueId } from "../../../../core/entities/unique-id";

export interface DeliveryPersonProps {
    id?: UniqueId
    userId: UniqueId
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
    get userId() {
        return this.props.userId
    }

    static create(
        props: DeliveryPersonProps,
        id?: UniqueId
    ) {
        const deliveryPerson = new DeliveryPerson({
            userId: props.userId
        }, id)

        return deliveryPerson
    }
}