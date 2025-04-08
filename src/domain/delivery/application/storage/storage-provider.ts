export abstract class StorageProvider{
    abstract upload(file: Express.Multer.File): Promise<string>
}