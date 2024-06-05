import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {TeamEntity} from "../team/teamEntity.ts";
import {TableEntity} from "../table/tableEntity.ts";
import {DkBaseEntity} from "../abstract/dkBaseEntity.ts";

@Entity("game")
export class GameEntity extends DkBaseEntity {

  @OneToOne(() => TableEntity, {cascade: true})
  @JoinColumn()
  table!: TableEntity;

  @Column()
  gameMode!: string;

  @OneToOne(() => TeamEntity, {onDelete: "CASCADE", cascade: true})
  @JoinColumn()
  teamWhite!: TeamEntity;

  @OneToOne(() => TeamEntity, {onDelete: "CASCADE", cascade: true})
  @JoinColumn()
  teamBlack!: TeamEntity;

  @Column()
  pointsToWin!: number;


  toString(): string {
    return `{table: ${this.table.toString()}, gameMode: ${this.gameMode},
            teamWhite: ${this.teamWhite.toString()}, teamBlack: ${this.teamBlack.toString()},
            pointsToWin: ${this.pointsToWin},}`;
  }
}