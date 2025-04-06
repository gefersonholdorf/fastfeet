import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Encrypt } from "src/domain/delivery/application/criptography/encrypt";

@Injectable()
export class jwtEncrypt implements Encrypt {

    constructor(private readonly jwtService: JwtService) {}

    async encrypt(payload: Record<string, any>): Promise<string> {
        return this.jwtService.signAsync(payload)
    }
}