/* eslint-disable prettier/prettier */
import { Institution } from 'src/institutions/entities/institution.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InstitutionLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @ManyToOne(() => Institution, (institution) => institution.locations, {
    onDelete: 'CASCADE',
  })
  institution: Institution;
}
