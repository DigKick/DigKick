import {Column, Entity} from "typeorm";
import {DkEntity} from "../global/dkEntity.ts";

@Entity("player")
export class PlayerEntity extends DkEntity {

  @Column({default: 0, nullable: false})
  elo!: number;

  @Column({default: "GUEST", nullable: false})
  name!: string;

  @Column({default: "INVALID", nullable: false})
  hashedKey!: string;

}