import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './modules/seed/seed.module';
import { SeedService } from './modules/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seedService = app.select(SeederModule).get(SeedService);

  await seedService.seed();
  console.log('Seeding successful');
  app.close();
}
bootstrap();
