import { Module } from "@nestjs/common";
import { StorageProvider } from "src/domain/delivery/application/storage/storage-provider";
import { LocalStorage } from "./local-storage";

@Module({
    providers: [
        {
            provide: StorageProvider,
            useClass: LocalStorage
        }
    ],
    exports: [StorageProvider]
})
export class StorageModule {}