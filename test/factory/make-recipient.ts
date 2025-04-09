import { Address } from "src/domain/delivery/enterprise/entities/address";
import { Recipient } from "src/domain/delivery/enterprise/entities/recipient";

export function makeRecipient() {
    return Recipient.create({
            name: "Renato Feleps",
            address: Address.create({
                street: "Rua Topava",
                number: 566,
                neighborhood: "Toronto",
                city: "Balneário",
                state: "SC"
            })
        })
}