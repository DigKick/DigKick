import {Column, Entity} from "typeorm";
import {DkEntity} from "../global/dkEntity.ts";

@Entity("player")
export class PlayerEntity extends DkEntity {

  @Column()
  elo!: number;

  @Column()
  name!: string;

  @Column()
  hashedKey!: string;

  toString(): string {
    return `{elo:${this.elo}, name:${this.name}, hashedKey:${this.hashedKey}}`;
  }

}