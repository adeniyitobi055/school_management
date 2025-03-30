/* eslint-disable prettier/prettier */
import { Institution } from 'src/institutions/entities/institution.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  staffId: string;

  @Column()
  department: string;

  @ManyToMany(() => Subject, (subject) => subject.users, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  subjects: Subject[];

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'TEACHER' })
  role: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isPresent: boolean;

  @Column({ default: false })
  isTeaching: boolean;

  @ManyToOne(() => Institution, (institution) => institution.users, {
    onDelete: 'CASCADE',
  })
  institution: Institution;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
