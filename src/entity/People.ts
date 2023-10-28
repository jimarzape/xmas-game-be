import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FamilyGroup } from "./FamilyGroup";
import { Group } from "./Group";

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => FamilyGroup, (family) => family.id)
  @JoinColumn({ name: "family_id" })
  family: FamilyGroup;

  @Column()
  family_id: number;

  @OneToMany((type) => Group, (group) => group.id)
  @JoinColumn({ name: "group_id" })
  group: Group;

  @Column()
  group_id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  gender: string; //male of female

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
