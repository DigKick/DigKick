import {Column, Entity} from "typeorm";
import {DkEntity} from "../abstract/dkEntity.ts";

@Entity("team")
export class TeamEntity extends DkEntity {

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