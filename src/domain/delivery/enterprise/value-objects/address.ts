import { Entity } from "../../../../core/entities/entity";
import { UniqueId } from "../../../../core/entities/unique-id";

export interface AddressProps {
    id?: UniqueId
    street: string
    number: number
    neighborhood: string
    city: string
    state: string
    zipCode: string
}

export class Address extends Entity<AddressProps> {
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

    get zipCode() {
        return this.props.zipCode
    }

    static create(
        props: AddressProps,
        id?: UniqueId
    ){
        const address = new Address({
            street: props.street,
            number: props.number,
            neighborhood: props.neighborhood,
            city: props.city,
            state: props.state,
            zipCode: props.zipCode
        },
        id)

        return address
    }
}