import { beforeEach, describe, expect, it } from "vitest";
import { FakeHasher } from "../../../../../tests/cryptography/fake-hasher";
import { InMemoryUserRepository } from "../../../../../tests/repositories/in-memory.user-repository";
import { RegisterUserUseCase } from "./register-user-use-case";
import { makeUser } from "../../../../../tests/factories/make-user";
import { CPFAlreadyExistsUseCaseError } from "../../../../core/errors/cpf-already-exists-error";

let inMemoryUserRepository: InMemoryUserRepository
let hasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register User [UNIT]', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        hasher = new FakeHasher()
        sut = new RegisterUserUseCase(inMemoryUserRepository, hasher)
    })

    it('should be able to register the user', async() => {
        const result = await sut.execute({
            name: 'Fábio Almeida',
            email: 'fabio@gmail.com',
            cpf: '106.845.659-45',
            password: 'senha123',
            role: 'DELIVERY'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items).toHaveLength(1)
    })

    it('should be able to register the user and the password must have been hashed', async() => {
        const result = await sut.execute({
            name: 'Fábio Almeida',
            email: 'fabio@gmail.com',
            cpf: '106.845.659-45',
            password: 'senha123',
            role: 'DELIVERY'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items).toHaveLength(1)
        expect(inMemoryUserRepository.items[0].props.password).toEqual('senha123-concat')
    })

    it('should be able to return an error when providing an an existing CPF', async() => {
        inMemoryUserRepository.create(makeUser())

        const result = await sut.execute({
            name: 'Fábio Almeida',
            email: 'fabio@gmail.com',
            cpf: '106.845.659-45',
            password: 'senha123',
            role: 'DELIVERY'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(CPFAlreadyExistsUseCaseError)
        expect(inMemoryUserRepository.items).toHaveLength(1)
    })
})