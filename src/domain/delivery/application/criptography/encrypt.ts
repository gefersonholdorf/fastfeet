export abstract class Encrypt {
    abstract encrypt(payload: Record<string, any>):Promise<string>
}