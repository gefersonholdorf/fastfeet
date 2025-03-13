import type { UniqueId } from "../../src/core/entities/unique-id";
import { User, type UserProps } from "../../src/domain/delivery/enterprise/entities/user";

export function makeUser(
    override: Partial<UserProps> = {},
    id?: UniqueId
) {
    const user = User.create({
        name: 'Fábio Almeida',
        email: 'fabio@gmail.com',
        cpf: '106.845.659-45',
        password: 'senha123',
        role: 'DELIVERY',
        ...override
    }
    , id)

    return user
}