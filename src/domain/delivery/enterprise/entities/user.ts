import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import type { ROLE } from "../types/role";
import { EntityBase } from "src/core/entities/entity-base";

export interface UserProps {
    userId?: UniqueEntityId
    name: string
    email: string
    cpf: string
    password: string
    role?: ROLE
    addressId?: UniqueEntityId | null
}

export class User extends EntityBase<UserProps> {

    get userId() {
        return this.props.userId
    }

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

    get password() {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }

    get role() {
        return this.props.role!
    }

    set role(role: ROLE) {
        this.props.role = role
    }

    get addressId() {
        return this.props.addressId
    }

    static create(
        props: UserProps,
        id?: UniqueEntityId
    ) {
        const user = new User(
            {
                name: props.name,
                email: props.email,
                cpf: props.cpf,
                password: props.password,
                role: props.role ?? 'ADMIN',
                addressId: props.addressId ?? null
            },
            id ?? new UniqueEntityId()
        )

        return user
    }
}