import {Column, Entity} from "typeorm";
import {DkBaseEntity} from "./dkBaseEntity.ts";

@Entity("team")
export class TeamEntity extends DkBaseEntity {

  @Column()
  color!: string;

  @Column()
  score!: number;

  @Column()
  isWinner!: boolean;

}