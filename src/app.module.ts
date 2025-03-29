/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from './subjects/subjects.module';
import { User } from './users/entities/user.entity';
import { Subject } from './subjects/entities/subject.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('30m'),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    AttendanceModule,
    SubjectsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get<string>('DATABASE_URL'),
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'N1ger1@MySQL',
        database: 'school_management',
        autoLoadEntities: true,
        synchronize: false, // Set to false in production
        entities: [User, Subject],
        migrations: ['dist/migrations/*.ts'],
        migrationsRun: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
