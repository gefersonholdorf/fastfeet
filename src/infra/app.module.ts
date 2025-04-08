import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { EnvModule } from './env/env.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [DatabaseModule, HttpModule, EnvModule, CryptographyModule, AuthModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
