import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvent } from "src/core/events/domain-event";
import { Order } from "../../enterprise/entities/order";

export class DeliveryOrderEvent implements DomainEvent {
    ocurredAt: Date;
    order: Order;

    constructor(order: Order) {
        this.ocurredAt = new Date()
        this.order = order
    }

    getAggregateId(): UniqueEntityId {
        return this.order.id
    }
}