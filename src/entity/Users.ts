import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Timestamp,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 125 })
  email: string;

  @Column({ length: 125, nullable: true })
  name: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "timestamp", nullable: true })
  lastLogin: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
