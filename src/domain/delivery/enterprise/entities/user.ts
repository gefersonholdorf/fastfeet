import { Entity } from "../../../../core/entities/entity";
import type { UniqueId } from "../../../../core/entities/unique-id";
import type { Optional } from "../../../../core/types/optional";

export type RoleUser = 'ADMIN' | 'DELIVERY'

export interface UserProps {
    id?: UniqueId,
    name: string,
    email: string,
    cpf: string
    password: string,
    role: RoleUser
}

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get email() {
        return this.props.email
    }

    get cpf() {
        return this.props.cpf
    }

    set password(password: string) {
        this.props.password = password
    }

    get role() {
        return this.props.role
    }

    static create(
        props: Optional<UserProps, 'role'>,
        id?: UniqueId
    ) {
        const user = new User({
            name: props.name,
            email: props.email,
            cpf: props.cpf,
            password: props.password,
            role: props.role ?? 'ADMIN'
        }, id)

        return user
    }
}