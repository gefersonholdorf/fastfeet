import  { EventHandler } from "src/core/events/event-handler";
import  { UserRepository } from "src/domain/delivery/application/repositories/user-repository";
import  { SendEmailUseCase } from "../use-cases/send-email-use-case";
import { DomainEvents } from "src/core/events/domain-events";
import { DeliveryOrderEvent } from "src/domain/delivery/application/events/delivery-order-event";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OnDeliveryOrder implements EventHandler{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly sendEmailUseCase: SendEmailUseCase
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.execute.bind(this), DeliveryOrderEvent.name)
    }

    async execute(event: DeliveryOrderEvent) {
        const {ocurredAt, order} = event

        const user = await this.userRepository.findById(order.userId.value)

        if(!user) {
            console.log('Usuário não encontrado para enviar o e-mail.')
            throw new Error()
        }

        await this.sendEmailUseCase.execute({
            to: user.email,
            subject: 'Encomenda Entregue!',
            text: `Sua encomenda foi entregue as ${ocurredAt}`
        })
    }
}