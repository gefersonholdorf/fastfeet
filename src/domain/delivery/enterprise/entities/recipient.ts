import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface RecipientProps {
    recipientId?: UniqueEntityId
    name: string
    addressId: UniqueEntityId
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

    get addressId() {
        return this.props.addressId
    }

    static create(
        props: RecipientProps,
        id?: UniqueEntityId
    ) {
        const recipient = new Recipient(
            {
                name: props.name,
                addressId: props.addressId
            },
            id ?? new UniqueEntityId()
        )

        return recipient
    }
}