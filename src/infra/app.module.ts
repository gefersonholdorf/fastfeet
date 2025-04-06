import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { EnvModule } from './env/env.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, HttpModule, EnvModule, CryptographyModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
