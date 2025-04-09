import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { OrderRepository } from "../../repositories/order-repository";
import { makeOrder } from "test/factory/make-order";
import { DeliveryOrderUseCase } from "./delivery-order-use-case";
import { StorageProvider } from "../../storage/storage-provider";
import { Readable } from "stream";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

describe('Delivery Order [UNIT]', () => {
    let orderRepository: Mocked<OrderRepository>
    let storage: Mocked<StorageProvider>
    let sut: DeliveryOrderUseCase
    let mockFile: Express.Multer.File

    beforeEach(() => {
        orderRepository = {
            findById: vi.fn(),
            save: vi.fn()
        } as unknown as Mocked<OrderRepository>

        storage = {
            upload: vi.fn()
        } as unknown as Mocked<StorageProvider>

        sut = new DeliveryOrderUseCase(orderRepository, storage)

        mockFile = {
            fieldname: 'file',
            originalname: 'test.txt',
            encoding: '7bit',
            mimetype: 'text/plain',
            size: 100,
            destination: 'uploads/',
            filename: 'test.txt',
            path: 'uploads/test.txt',
            buffer: Buffer.from('conteúdo de teste'),
            stream: Readable.from(Buffer.from('conteúdo de teste')),
          };
    })

    it('should be able to delivery a order', async() => {
        const fakeOrder = makeOrder()
        fakeOrder.userId = new UniqueEntityId(1)

        orderRepository.findById.mockResolvedValue(fakeOrder)
        storage.upload.mockResolvedValue('/newfile.png')

        const result = await sut.execute({
            userId: 1,
            orderId: 1,
            file: mockFile
        })
        
        expect(result.isRight()).toBe(true)
    })

    it('should be possible to return an error when finding a order with an existing Id', async() => {

        orderRepository.findById.mockResolvedValue(null)

        const result = await sut.execute({
            userId: 1,
            orderId: 1,
            file: mockFile
        })
        
        expect(result.isLeft()).toBe(true)
    })
})