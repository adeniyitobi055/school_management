/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Subject } from './subjects/entities/subject.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'N1ger1@MySQL',
  database: 'school_management',
  entities: [User, Subject],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // Always false for migrations
  migrationsRun: false,
  logging: true,
});
