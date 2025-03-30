/* eslint-disable prettier/prettier */
import { Class } from 'src/class/entities/class.entity';
import { InstitutionLocation } from 'src/institution-locations/entities/institution-location.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('institutions')
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

  @OneToMany(() => InstitutionLocation, (location) => location.institution)
  locations: InstitutionLocation[];

  @OneToMany(() => User, (user) => user.institution)
  users: User[];

  @OneToMany(() => Class, (cls) => cls.institution)
  classes: Class[];
}
