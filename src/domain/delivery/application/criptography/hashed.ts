export abstract class Hashed {
    abstract hash(text: string):Promise<string>
    abstract compareHash(text: string, hash: string):Promise<boolean>
}