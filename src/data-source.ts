/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Subject } from './subjects/entities/subject.entity';
import { Institution } from './institutions/entities/institution.entity';
import { InstitutionLocation } from './institution-locations/entities/institution-location.entity';
import { Classes } from './classes/entities/classes.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'N1ger1@MySQL',
  database: 'school_management',
  entities: [User, Subject, Institution, InstitutionLocation, Classes],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // Always false for migrations
  migrationsRun: false,
  logging: true,
});
