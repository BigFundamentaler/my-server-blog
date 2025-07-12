import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  // 配置 Prisma 二进制文件路径（使用 Layer 中的）
  process.env.PRISMA_QUERY_ENGINE_BINARY = '/opt/nodejs/node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-3.0.x.so.node';
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: any,
) => {
  // 冷启动优化：重用服务器实例
  if (!server) {
    server = await bootstrap();
  }
  
  return server(event, context, callback);
};