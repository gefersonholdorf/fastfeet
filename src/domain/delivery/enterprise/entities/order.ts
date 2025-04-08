import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import type { ORDERSTATUS } from "../types/order-status";
import { EntityBase } from "src/core/entities/entity-base";

export interface OrderProps {
    orderId?: UniqueEntityId
    status?: ORDERSTATUS
    postedOn?: Date
    pickupDate?: Date | null
    deliveryDate?: Date | null
    filename?: string | null
    userId?: UniqueEntityId | null
    recipientId: UniqueEntityId
}

export class Order extends EntityBase<OrderProps> {
    
    get orderId() {
        return this.props.orderId
    }

    get status() {
        return this.props.status!
    }

    set status(status: ORDERSTATUS) {
        this.props.status = status
    }

    get postedOn() {
        return this.props.postedOn
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

    get filename() {
        return this.props.filename!
    }

    set filename(filename: string) {
        this.props.filename = filename
    }

    get userId() {
        return this.props.userId!
    }

    set userId(userId: UniqueEntityId) {
        this.props.userId = userId
    }

    get recipientId() {
        return this.props.recipientId
    }

    static create(
        props: OrderProps,
        id?: UniqueEntityId
    ) {
        const order = new Order(
            {
                status: props.status ?? 'PENDENTE',
                postedOn: props.postedOn ?? new Date(),
                pickupDate: props.pickupDate ?? null,
                deliveryDate: props.deliveryDate ?? null,
                filename: props.filename ?? null,
                userId: props.userId ?? null,
                recipientId: props.recipientId
            },
            id ?? new UniqueEntityId()
        )

        return order
    }
}
