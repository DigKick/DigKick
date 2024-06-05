import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {DkBaseEntity} from "./dkBaseEntity.ts";
import {TeamEntity} from "./teamEntity.ts";
import {TableEntity} from "./tableEntity.ts";

@Entity("game")
export class GameEntity extends DkBaseEntity {

  @OneToOne(type => TableEntity, table => table.id)
  @JoinColumn()
  table!: TableEntity;

  @Column()
  gameMode!: string;

  @OneToOne(type => TeamEntity, team => team.id, {onDelete: "CASCADE"})
  @JoinColumn()
  teamWhite!: TeamEntity;

  @OneToOne(type => TeamEntity, team => team.id, {onDelete: "CASCADE"})
  @JoinColumn()
  teamBlack!: TeamEntity;

  @Column()
  pointsToWin!: number;

}