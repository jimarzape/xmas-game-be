import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FamilyGroup } from "./FamilyGroup";
import { Category } from "./Category";
import { boolean } from "joi";

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => FamilyGroup, (family) => family.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "family_id" })
  family: FamilyGroup;

  @Column()
  family_id: number;

  @ManyToOne((type) => Category, (category) => category.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  gender: string; //male of female

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true, type: "longtext" })
  avatar: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isHbd: boolean;

  @Column({ type: "boolean", default: false })
  isWon: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
