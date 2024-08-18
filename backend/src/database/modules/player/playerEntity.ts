import { BeforeInsert, Column, Entity } from 'typeorm';
import { DkEntity } from '../global/dkEntity.ts';
import { generateUsername } from 'unique-username-generator';
import { ApplicationProperties } from '../../../util/properties/applicationProperties.ts';

@Entity('player')
export class PlayerEntity extends DkEntity {
  @Column({ default: ApplicationProperties.get().player.elo })
  elo!: number;

  @Column()
  name!: string;

  @Column()
  hashSerialNumber!: string;

  @BeforeInsert()
  generateUsername() {
    this.name = generateUsername();
  }

  toString(): string {
    return `{elo:${this.elo}, name:${this.name}, hashedKey:${this.hashSerialNumber}}`;
  }
}
