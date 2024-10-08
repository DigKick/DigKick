import { DataSource } from 'typeorm';
import { GameEntity } from '../../../src/database/modules/game/gameEntity.ts';
import { TableEntity } from '../../../src/database/modules/table/tableEntity.ts';
import { TeamEntity } from '../../../src/database/modules/team/teamEntity.ts';
import { PlayerEntity } from '../../../src/database/modules/player/playerEntity.ts';

let dataSource: DataSource;

export async function createNewTestDatabase() {
  dataSource = new DataSource({
    type: 'sqlite',
    database: `:memory:`,
    entities: [GameEntity, TableEntity, TeamEntity, PlayerEntity],
    logger: 'advanced-console',
    synchronize: true,
    migrations: ['../models/*.ts'],
  });
  await dataSource.initialize();
}
