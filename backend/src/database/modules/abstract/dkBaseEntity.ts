import {BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class DkBaseEntity extends BaseEntity {

  @PrimaryGeneratedColumn("increment")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}