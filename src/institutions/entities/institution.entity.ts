/* eslint-disable prettier/prettier */
import { Classes } from 'src/classes/entities/classes.entity';
import { InstitutionLocation } from 'src/institution-locations/entities/institution-location.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  address: string;

  @Column()
  headOfInstitution: string;

  @Column({ unique: true })
  website: string;

  @OneToMany(() => InstitutionLocation, (location) => location.institution, {
    eager: true,
  })
  locations: InstitutionLocation[];

  @OneToMany(() => User, (user) => user.institution)
  users: User[];

  @OneToMany(() => Classes, (cls) => cls.institution)
  classes: Classes[];
}
