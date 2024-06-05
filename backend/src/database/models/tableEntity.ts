import {DkBaseEntity} from "./dkBaseEntity.ts";
import {Column, Entity} from "typeorm";

@Entity("table")
export class TableEntity extends DkBaseEntity {

  @Column()
  name!: string;

}