import { AgregateRoot } from "../../../../core/entities/agregate-root";
import type { UniqueId } from "../../../../core/entities/unique-id";
import type { Address } from "../value-objects/address";

export interface RecipientProps {
    id?: UniqueId
    name: string
    address: Address
}

export class Recipient extends AgregateRoot<RecipientProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get address() {
        return this.props.address
    }

    static create(
        props: RecipientProps,
        id?: UniqueId 
    ) {
        const recipient = new Recipient({
            name: props.name,
            address: props.address
        }, id)

        return recipient
    }
}