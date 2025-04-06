import { Module } from "@nestjs/common";
import { Hashed } from "src/domain/delivery/application/criptography/hashed";
import { BcryptHashed } from "./bcrypt/bcrypt-hashed";

@Module({
    providers: [
        {
            provide: Hashed,
            useClass: BcryptHashed
        }
    ],
    exports: [Hashed]
})
export class CryptographyModule {}