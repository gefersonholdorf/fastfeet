import { beforeEach, describe, expect, it, vi, Mocked} from 'vitest';
import { LoginUseCase } from './login-use-case';
import { UserRepository } from '../../repositories/user-repository';
import { Hashed } from '../../criptography/hashed';
import { Encrypt } from '../../criptography/encrypt';
import { User } from '../../../enterprise/entities/user';
import { Address } from '../../../enterprise/entities/address';

describe('Login [UNIT]', () => {
    let userRepository: Mocked<UserRepository>
    let hashedService: Mocked<Hashed>
    let encryptService: Mocked<Encrypt>
    let sut: LoginUseCase

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

        encryptService = {
            encrypt: vi.fn(),
        }

        sut = new LoginUseCase(userRepository, hashedService, encryptService)
    })

    it('should be able login', async () => {

        const fakeUser: User = User.create({
            name: 'Renato Feleps',
            email: 'renato@gmail.com',
            cpf: '87565425685',
            password: 'senha123',
            role: 'ADMIN',
            address: Address.create({
                street: 'Rua Topava',
                number: 566,
                neighborhood: 'Toronto',
                city: 'Balneário',
                state: 'SC'
            })
        }) as User

        userRepository.findByCpf.mockResolvedValue(fakeUser)
        hashedService.compareHash.mockResolvedValue(true)
        encryptService.encrypt.mockResolvedValue('token123')

        const result = await sut.execute({
            cpf: '87565425685',
            password: 'senha123'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toMatchObject({
            access_token: 'token123'
        })
    })

    it('should be possible to return an error when entering an incorrect CPF', async () => {

        const fakeUser: User = User.create({
            name: 'Renato Feleps',
            email: 'renato@gmail.com',
            cpf: '87565425685',
            password: 'senha123',
            role: 'ADMIN',
            address: Address.create({
                street: 'Rua Topava',
                number: 566,
                neighborhood: 'Toronto',
                city: 'Balneário',
                state: 'SC'
            })
        }) as User

        userRepository.findByCpf.mockResolvedValue(null)
        hashedService.compareHash.mockResolvedValue(false)

        const result = await sut.execute({
            cpf: '10685478920',
            password: 'senha123'
        })

        expect(result.isLeft()).toBe(true)
    })

    it('should be possible to return an error when entering an incorrect password', async () => {

        const fakeUser: User = User.create({
            name: 'Renato Feleps',
            email: 'renato@gmail.com',
            cpf: '87565425685',
            password: 'senha123',
            role: 'ADMIN',
            address: Address.create({
                street: 'Rua Topava',
                number: 566,
                neighborhood: 'Toronto',
                city: 'Balneário',
                state: 'SC'
            })
        }) as User

        userRepository.findByCpf.mockResolvedValue(fakeUser)
        hashedService.compareHash.mockResolvedValue(false)

        const result = await sut.execute({
            cpf: '87565425685',
            password: 'senha123456'
        })

        expect(result.isLeft()).toBe(true)
    })
})