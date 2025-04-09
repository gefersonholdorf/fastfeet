import { describe, it, Mocked, vi, beforeEach,expect } from "vitest";
import { Hashed } from "../../criptography/hashed";
import { UserRepository } from "../../repositories/user-repository";
import { CreateUserUseCase } from "./create-user-use-case";
import { makeUser } from "test/factory/make-user";

describe('Create User [UNIT]', () => {
    let userRepository: Mocked<UserRepository>
    let hashedService: Mocked<Hashed>
    let sut: CreateUserUseCase

    beforeEach(() => {
        userRepository = {
            create: vi.fn(),
            findById: vi.fn(),
            findByCpf: vi.fn(),
            findByEmail: vi.fn(),
            save: vi.fn()
        } as unknown as Mocked<UserRepository>

        hashedService = {
            hash: vi.fn(),
            compareHash: vi.fn(),
        }

        sut = new CreateUserUseCase(userRepository, hashedService)
    })

    it('should be able to create user', async () => {
        const fakeUser = makeUser()

        userRepository.findByEmail.mockResolvedValue(null)
        userRepository.findByCpf.mockResolvedValue(null)

        hashedService.hash.mockResolvedValue('senha123hash')

        const result = await sut.execute(fakeUser)
        
        expect(result.isRight()).toBe(true)
    })

    it('should be possible to return an error when finding a user with an existing Email', async () => {
        const fakeUser = makeUser()

        userRepository.findByEmail.mockResolvedValue(fakeUser)
        userRepository.findByCpf.mockResolvedValue(null)

        hashedService.hash.mockResolvedValue('senha123hash')

        const result = await sut.execute(fakeUser)
        
        expect(result.isLeft()).toBe(true)
    })

    it('should be possible to return an error when finding a user with an existing CPF', async () => {
        const fakeUser = makeUser()

        userRepository.findByEmail.mockResolvedValue(null)
        userRepository.findByCpf.mockResolvedValue(fakeUser)

        hashedService.hash.mockResolvedValue('senha123hash')

        const result = await sut.execute(fakeUser)
        
        expect(result.isLeft()).toBe(true)
    })
})