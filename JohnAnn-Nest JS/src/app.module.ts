import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
//import { ConfigModule } from '@nestjs/config';
//import Joi from 'joi';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    //   ignoreEnvFile: process.env.NODE_ENV === 'prod',
    //   // validationSchema: Joi.object({
    //   //   NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
    //   //   DB_HOST: Joi.string().required(),
    //   //   DB_PORT: Joi.string().required(),
    //   //   DB_USERNAME: Joi.string().required(),
    //   //   DB_PASSWORD: Joi.string().required(),
    //   //   DB_DATABASE: Joi.string().required(),
    //   // }),
    // }),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
