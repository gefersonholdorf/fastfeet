import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ROLE } from "../types/role";
import { EntityBase } from "src/core/entities/entity-base";
import { Address } from "./address";

export interface UserProps {
    userId?: UniqueEntityId
    name: string
    email: string
    cpf: string
    password: string
    role?: ROLE
    address: Address
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

    get address() {
        return this.props.address
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
                address: props.address
            },
            id ?? new UniqueEntityId()
        )

        return user
    }
}