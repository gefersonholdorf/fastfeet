import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "../env/env.service";
import { EnvModule } from "../env/env.module";
import { Encrypt } from "src/domain/delivery/application/criptography/encrypt";
import { jwtEncrypt } from "./jwt/jwt-encrypt";

@Module({
    imports: [EnvModule, JwtModule.registerAsync({
        imports: [EnvModule],
        inject: [EnvService],
        useFactory: async(envService: EnvService) => ({
            secret: envService.get('SECRET_KEY'),

            signOptions: {
                expiresIn: '1d'
            }
        })
    })],
    providers: [
        {
            provide: Encrypt,
            useClass: jwtEncrypt
        }
    ],
    exports: [JwtModule, Encrypt]
})
export class AuthModule{}