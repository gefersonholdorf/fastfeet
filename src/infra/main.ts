import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação Fastfeet')
    .setDescription('Projeto final da formação NodeJS da rocketseat')
    .setVersion('1.0')
    .addTag('fastfeet')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  
  await app.listen(port);
}
bootstrap();
