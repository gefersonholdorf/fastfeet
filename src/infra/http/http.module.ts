import { Module } from "@nestjs/common";
import { CreateRecipientController } from "./controllers/recipient/create-recipient.controller";
import { CreateRecipientUseCase } from "src/domain/delivery/application/use-cases/recipient/create-recipient-use-case";
import { DatabaseModule } from "../database/database.module";
import { CreateUserController } from "./controllers/user/create-user.controller";
import { CreateUserUseCase } from "src/domain/delivery/application/use-cases/user/create-user-use-case";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthModule } from "../auth/auth.module";
import { LoginController } from "./controllers/auth/login.controller";
import { LoginUseCase } from "src/domain/delivery/application/use-cases/auth/login-use-case";
import { EnvModule } from "../env/env.module";
import { CreateOrderUseCase } from "src/domain/delivery/application/use-cases/order/create-order-use-case";
import { WithdrawnOrderUseCase } from "src/domain/delivery/application/use-cases/order/withdraw-order-use-case";
import { DeliveryOrderUseCase } from "src/domain/delivery/application/use-cases/order/delivery-order-use-case";
import { CreateOrderController } from "./controllers/order/create-order.controller";
import { WithdrawnOrderController } from "./controllers/order/withdrawn-order.controller";
import { GetOrderByIdController } from "./controllers/order/get-order-by-id.controller";
import { GetOrderByIdUseCase } from "src/domain/delivery/application/use-cases/order/get-order-by-id-use-case";
import { FetchOrdersByUserIdController } from "./controllers/order/fetch-orders-by-user-id.controller";
import { FetchOrdersByUserIdUseCase } from "src/domain/delivery/application/use-cases/order/fetch-orders-by-user-id-use-case";

@Module({
    imports: [
        DatabaseModule, CryptographyModule, AuthModule, EnvModule
    ],
    controllers: [
        CreateRecipientController, CreateUserController, LoginController, CreateOrderController, WithdrawnOrderController,
        GetOrderByIdController, FetchOrdersByUserIdController
    ],
    providers: [
        CreateRecipientUseCase, CreateUserUseCase, LoginUseCase, CreateOrderUseCase, WithdrawnOrderUseCase, DeliveryOrderUseCase,
        GetOrderByIdUseCase, FetchOrdersByUserIdUseCase
    ]
})
export class HttpModule{}