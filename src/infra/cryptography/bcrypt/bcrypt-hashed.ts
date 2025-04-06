import { Injectable } from "@nestjs/common";
import { Hashed } from "src/domain/delivery/application/criptography/hashed";
import {hashSync, compareSync} from 'bcryptjs'

@Injectable()
export class BcryptHashed implements Hashed {

    async hash(text: string): Promise<string> {
        const SALTORROUNDS = 6
        return hashSync(text, SALTORROUNDS)
    }

    async compareHash(text: string, hash: string): Promise<boolean> {
        return compareSync(text, hash)
    }

}