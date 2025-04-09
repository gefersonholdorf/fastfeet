import { Address } from "src/domain/delivery/enterprise/entities/address";
import { User } from "src/domain/delivery/enterprise/entities/user";

export function makeUser() {
    return User.create({
        name: "Renato Feleps",
        email: "renato@gmail.com",
        cpf: "10678456949",
        password: "senha123",
        role: "ADMIN",
        address: Address.create({
            street: "Rua Topava",
            number: 566,
            neighborhood: "Toronto",
            city: "Balneário",
            state: "SC"
        })
    })
}