import { EntityBase } from "src/core/entities/entity-base"

export interface CommunicationProps {
    to: string
    subject: string
    text: string
}

export class Communication extends EntityBase<CommunicationProps> {

    get to() {
        return this.props.to
    }

    get subject() {
        return this.props.subject
    }

    get text() {
        return this.props.text
    }

    static create(
        props: CommunicationProps
    ) {
        return new Communication({
            to: props.to,
            subject: props.subject,
            text: props.text
        })
    }
}