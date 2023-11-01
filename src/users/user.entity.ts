import { Role } from 'src/roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({name: 'phone_number',})
  phone_number: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role
 
  @Column({ default: true })
  isActive: boolean;

}