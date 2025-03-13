import type { Hasher } from "../../src/domain/delivery/application/cryptography/hasher";

export class FakeHasher implements Hasher {

    async hash(text: string): Promise<string> {
        return text.concat('-concat')
    }

    async compare(text: string, hash: string): Promise<boolean> {
        return text.concat('-concat') === hash
    }

}