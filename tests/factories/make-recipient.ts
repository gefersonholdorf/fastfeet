import type { UniqueId } from "../../src/core/entities/unique-id";
import type { Optional } from "../../src/core/types/optional";
import { Recipient, type RecipientProps } from "../../src/domain/delivery/enterprise/entities/recipient";
import { Address } from "../../src/domain/delivery/enterprise/value-objects/address";

export function makeRecipient(
    override: Partial<RecipientProps> = {},
    id?: UniqueId
) {
    const recipient = Recipient.create({
        name: 'José Almeida',
        address: Address.create({
            street: 'Rua Inter', 
            number: 233, 
            neighborhood: 'São Paulo', 
            city: 'São Paulo', 
            state: 'SP', 
            zipCode: '89457-000'
        }),
        ...override
    }, id)

    return recipient
}