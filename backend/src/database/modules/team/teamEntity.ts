import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {DkEntity} from "../global/dkEntity.ts";
import {PlayerEntity} from "../player/playerEntity.ts";

@Entity("team")
export class TeamEntity extends DkEntity {

  @Column()
  color!: string;

  @Column()
  score!: number;

  @Column()
  isWinner!: boolean;

  @OneToOne(() => PlayerEntity)
  @JoinColumn()
  playerOne!: PlayerEntity;

  @OneToOne(() => PlayerEntity)
  @JoinColumn()
  playerTwo!: PlayerEntity;

  toString(): string {
    return `{color: ${this.color}, score: ${this.score}, isWinner: ${this.isWinner}}`;
  }
}