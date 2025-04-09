import { makeUser } from "test/factory/make-user";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { Hashed } from "../../criptography/hashed";
import { UserRepository } from "../../repositories/user-repository";
import { ChangePasswordUseCase } from "./change-password-use-case";

describe('Change password [UNIT]', () => {
    let userRepository: Mocked<UserRepository>
    let hashedService: Mocked<Hashed>
    let sut: ChangePasswordUseCase

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

        sut = new ChangePasswordUseCase(userRepository, hashedService)
    })

    it('should be able to create user', async () => {
        const fakeUser = makeUser()

        userRepository.findById.mockResolvedValue(fakeUser)

        hashedService.hash.mockResolvedValue('senha123hash')

        const result = await sut.execute({
            userId: 2,
            password: 'newPassword'
        })
        
        expect(result.isRight()).toBe(true)
    })

    it('should be possible to return an error when finding a user with an existing Id', async () => {
        const fakeUser = makeUser()

        userRepository.findById.mockResolvedValue(null)

        hashedService.hash.mockResolvedValue('senha123hash')

        const result = await sut.execute({
            userId: 2,
            password: 'newPassword'
        })
        
        expect(result.isLeft()).toBe(true)
    })
})