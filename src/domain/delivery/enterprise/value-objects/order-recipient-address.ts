import { ValueObject } from "src/core/entities/value-object"
import { ORDERSTATUS } from "../types/order-status"

export interface OrderRecipientAddressProps {
    orderId: number
    status: ORDERSTATUS
    postedOn: Date
    pickupDate: Date | null
    deliveryDate: Date | null
    userId: number | null
    recipient: {
        name: string
        address: {
            street: string
            number: number
            neighborhood: string
            city: string
            state: string
        }
    }
}

export class OrderRecipientAddress extends ValueObject<OrderRecipientAddressProps> {

    get orderId() {
        return this.props.orderId
    }

    get userId() {
        return this.props.userId
    }

    get status() {
        return this.props.status
    }

    get postedOn() {
        return this.props.postedOn
    }

    get pickupDate() {
        return this.props.pickupDate
    }
    
    get deliveryDate() {
        return this.props.deliveryDate
    }

    get recientName() {
        return this.props.recipient.name
    }

    get street() {
        return this.props.recipient.address.street
    }

    get number() {
        return this.props.recipient.address.number
    }

    get neighborhood() {
        return this.props.recipient.address.neighborhood
    }

    get city() {
        return this.props.recipient.address.city
    }

    get state() {
        return this.props.recipient.address.state
    }

    static create(
        props: OrderRecipientAddressProps
    ){
        return new OrderRecipientAddress({
            orderId: props.orderId,
            userId: props.userId,
            status: props.status,
            postedOn: props.postedOn,
            pickupDate: props.pickupDate ?? null,
            deliveryDate: props.deliveryDate ?? null,
            recipient: {
                name: props.recipient.name,
                address: {
                    street: props.recipient.address.street,
                    number: props.recipient.address.number,
                    neighborhood: props.recipient.address.neighborhood,
                    city: props.recipient.address.city,
                    state: props.recipient.address.state
                }
            }
        })
    }
}