import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DkEntity } from '../global/dkEntity.ts';
import { PlayerEntity } from '../player/playerEntity.ts';

@Entity('team')
export class TeamEntity extends DkEntity {
  @Column()
  name!: string;

  @Column()
  color!: string;

  @Column()
  score!: number;

  @Column()
  isWinner!: boolean;

  @ManyToOne(() => PlayerEntity, { nullable: true, eager: true })
  @JoinColumn()
  playerOne!: PlayerEntity;

  @ManyToOne(() => PlayerEntity, { nullable: true, eager: true })
  @JoinColumn()
  playerTwo!: PlayerEntity;

  toString(): string {
    return `{color: ${this.color}, score: ${this.score}, isWinner: ${this.isWinner}`;
  }
}
