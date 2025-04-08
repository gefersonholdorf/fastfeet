import { Injectable } from "@nestjs/common";
import { promises as fs } from 'fs'
import { join } from "path";
import { StorageProvider } from "src/domain/delivery/application/storage/storage-provider";

@Injectable()
export class LocalStorage implements StorageProvider {

    private path = './storage'

    async upload(file: Express.Multer.File): Promise<string> {
        const uniqueName = `${Date.now()}-${file.originalname}`
        const filePath = join(this.path, uniqueName)

        await fs.mkdir(this.path, {
            recursive: true
        })
        await fs.writeFile(filePath, file.buffer)

        return filePath
    }
}