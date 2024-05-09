import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([

    {
      name: 'Product 1',
      description: 'Product 1 description',
      image_url: 'https://www.foto.foto/fototeste',
      price: 100,
    },
    {
      name: 'Product 2',
      description: 'Product 12description',
      image_url: 'https://www.foto.foto/fototeste2',
      price: 200,
    },
    {
      name: 'Product 3',
      description: 'Product 123description',
      image_url: 'https://www.foto.foto/fototeste23',
      price: 300,
    },
  ])
  await app.close();
}
bootstrap();
