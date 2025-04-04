import { EntityBase } from "src/core/entities/entity-base";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export interface AddressProps {
    addressId?: UniqueEntityId
    street: string
    number: number
    neighborhood: string
    city: string
    state: string
}

export class Address extends EntityBase<AddressProps> {

    get addressId() {
        return this.props.addressId
    }

    get street() {
        return this.props.street
    }

    get number() {
        return this.props.number
    }

    get neighborhood() {
        return this.props.neighborhood
    }

    get city() {
        return this.props.city
    }

    get state() {
        return this.props.state
    }

    static create(
        props: AddressProps,
        id?: UniqueEntityId
    ) {
        const address = new Address({
            street: props.street,
            number: props.number,
            neighborhood: props.neighborhood,
            city: props.city,
            state: props.state
        },
        id ?? new UniqueEntityId())

        return address
    }
}