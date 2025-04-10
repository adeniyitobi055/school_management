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
import { InstitutionLocationsModule } from './institution-locations/institution-locations.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { ClassModule } from './classes/classes.module';
import * as Joi from 'joi';
import { Classes } from './classes/entities/classes.entity';
import { Institution } from './institutions/entities/institution.entity';
import { InstitutionLocation } from './institution-locations/entities/institution-location.entity';

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
    InstitutionsModule,
    InstitutionLocationsModule,
    SubjectsModule,
    ClassModule,
    AttendanceModule,
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
        entities: [User, Subject, Classes, Institution, InstitutionLocation],
        migrations: ['dist/migrations/*.js'],
        migrationsRun: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
