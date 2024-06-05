import {Column, Entity} from "typeorm";
import {DkBaseEntity} from "../abstract/dkBaseEntity.ts";

@Entity("table")
export class TableEntity extends DkBaseEntity {

  @Column({unique: true})
  name!: string;


  toString(): string {
    return `{name: ${this.name}}`;
  }
}