import { DomainEvents } from "src/core/events/domain-events";
import { EventHandler } from "src/core/events/event-handler";
import { WithdrawnOrderEvent } from "src/domain/delivery/application/events/withdrawn-order-event";
import { UserRepository } from "src/domain/delivery/application/repositories/user-repository";
import { SendEmailUseCase } from "../use-cases/send-email-use-case";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OnWithdrawnOrder implements EventHandler {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly sendEmailUseCase: SendEmailUseCase
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.execute.bind(this), WithdrawnOrderEvent.name)
    }

    private async execute(event: WithdrawnOrderEvent) {
        const {ocurredAt, order} = event
        const user = await this.userRepository.findById(order.userId.value)

        if(!user) {
            console.log('Usuário não encontrado para enviar o e-mail.')
            throw new Error()
        }

        await this.sendEmailUseCase.execute({
            to: user.email,
            subject: 'Encomenda retirada!',
            text: `Sua encomenda foi retirada as ${ocurredAt}`
        })
    }
}