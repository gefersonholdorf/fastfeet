import { beforeEach, describe, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { FakeHasher } from "../../../../../tests/cryptography/fake-hasher";
import { FakeEncrypter } from "../../../../../tests/cryptography/fake-encrypter";
import { InMemoryUserRepository } from "../../../../../tests/repositories/in-memory.user-repository";

let inMemoryUserRepository: InMemoryUserRepository
let hasher: FakeHasher
let encrypter: FakeEncrypter
let sut: AuthenticateUseCase

describe('Authenticate User [UNIT]', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        hasher = new FakeHasher()
        encrypter = new FakeEncrypter()
        sut = new AuthenticateUseCase(inMemoryUserRepository, hasher, encrypter)
    })

    it('should be able to authenticate user', async() => {

    })
})