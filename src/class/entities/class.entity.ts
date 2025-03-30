/* eslint-disable prettier/prettier */
import { Institution } from 'src/institutions/entities/institution.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Institution, (institution) => institution.classes, {
    onDelete: 'CASCADE',
  })
  institution: Institution;
}
