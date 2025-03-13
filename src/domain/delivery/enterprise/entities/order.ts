import { AgregateRoot } from "../../../../core/entities/agregate-root"
import type { UniqueId } from "../../../../core/entities/unique-id"
import type { Optional } from "../../../../core/types/optional"

export type OrderStatus = 'AGUARDANDO' | 'RETIRADO' | 'ENTREGUE' 

export interface OrderProps {
    id?: UniqueId
    recipientId: UniqueId
    status: OrderStatus
    postedOn: Date
    pickupDate: Date | null
    deliveryDate: Date | null
    deliveryPersonId: UniqueId
}

export class Order extends AgregateRoot<OrderProps> {
    get recipientId() {
        return this.props.recipientId
    }

    get orderStatus() {
        return this.props.status
    }

    set orderStatus(status: OrderStatus) {
        this.props.status = status
    }

    get postedOn() {
        return this.props.postedOn
    }

    set postedOn(postedOn: Date) {
        this.props.postedOn = postedOn
    }

    get pickupDate() {
        return this.props.pickupDate!
    }

    set pickupDate(pickupDate: Date) {
        this.props.pickupDate = pickupDate
    }

    get deliveryDate() {
        return this.props.deliveryDate!
    }

    set deliveryDate(deliveryDate: Date) {
        this.props.deliveryDate = deliveryDate
    }

    get deliveryPersonId() {
        return this.props.deliveryPersonId
    }

    static create(
        props: Optional<OrderProps, 'postedOn' | 'status' | 'deliveryDate' | 'pickupDate'>,
        id?: UniqueId
    ) {
        const order = new Order({
            recipientId: props.recipientId,
            deliveryPersonId: props.deliveryPersonId,
            postedOn: new Date(),
            status: 'AGUARDANDO',
            pickupDate: null,
            deliveryDate: null,
        }, id)

        return order
    }
}
