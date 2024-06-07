import {Column, Entity} from "typeorm";
import {DkEntity} from "../abstract/dkEntity.ts";

@Entity("table")
export class TableEntity extends DkEntity {

  @Column({unique: true})
  name!: string;


  toString(): string {
    return `{name: ${this.name}}`;
  }
}