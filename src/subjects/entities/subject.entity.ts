/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  department: string;

  @Column()
  unit: number;

  @ManyToMany(() => User, (user) => user.subjects)
  users: User[];
}
