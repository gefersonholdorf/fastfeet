import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { Address } from "./address";

export interface RecipientProps {
    recipientId?: UniqueEntityId
    name: string
    address: Address
}

export class Recipient extends EntityBase<RecipientProps> {

    get recipientId() {
        return this.props.recipientId
    }

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
        id?: UniqueEntityId
    ) {
        const recipient = new Recipient(
            {
                name: props.name,
                address: props.address
            },
            id ?? new UniqueEntityId()
        )

        return recipient
    }
}