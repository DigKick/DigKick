import {Column, Entity} from "typeorm";
import {DkBaseEntity} from "../abstract/dkBaseEntity.ts";

@Entity("team")
export class TeamEntity extends DkBaseEntity {

  @Column()
  color!: string;

  @Column()
  score!: number;

  @Column()
  isWinner!: boolean;


  toString(): string {
    return `{color: ${this.color}, score: ${this.score}, isWinner: ${this.isWinner}}`;
  }
}