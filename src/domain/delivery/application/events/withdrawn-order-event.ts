import type { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { Order } from "../../enterprise/entities/order";

export class WithdrawnOrderEvent implements DomainEvent{
    ocurredAt: Date;
    order: Order

    constructor(order: Order) {
        this.order = order
        this.ocurredAt = new Date()
    }

    getAggregateId(): UniqueEntityId {
        return this.order.id
    }
}