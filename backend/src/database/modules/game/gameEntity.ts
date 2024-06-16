import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {TeamEntity} from "../team/teamEntity.ts";
import {TableEntity} from "../table/tableEntity.ts";
import {DkEntity} from "../global/dkEntity.ts";

@Entity("game")
export class GameEntity extends DkEntity {

  @ManyToOne(() => TableEntity, {cascade: false, eager: true})
  @JoinColumn()
  table!: TableEntity;

  @Column()
  gameMode!: string;

  @OneToOne(() => TeamEntity, {onDelete: "CASCADE", cascade: true, eager: true})
  @JoinColumn()
  teamWhite!: TeamEntity;

  @OneToOne(() => TeamEntity, {onDelete: "CASCADE", cascade: true, eager: true})
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