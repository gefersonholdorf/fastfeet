import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "../env/env.service";
import { EnvModule } from "../env/env.module";
import { Encrypt } from "src/domain/delivery/application/criptography/encrypt";
import { jwtEncrypt } from "./jwt/jwt-encrypt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./jwt/auth.guard";
import { RolesGuard } from "./jwt/authorization/roles.guard";

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
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
    exports: [JwtModule, Encrypt]
})
export class AuthModule{}