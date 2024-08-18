import { DataSource } from 'typeorm';
import { GameEntity } from './modules/game/gameEntity.ts';
import { TableEntity } from './modules/table/tableEntity.ts';
import { TeamEntity } from './modules/team/teamEntity.ts';
import { Logger } from 'winston';
import { LoggerFactory } from '../logging/loggerFactory.ts';
import { PlayerEntity } from './modules/player/playerEntity.ts';
import { ApplicationProperties } from '../util/properties/applicationProperties.ts';

const logger: Logger = LoggerFactory.getLogger('DataSourceInitializer');

export const dataSource: DataSource = new DataSource({
  type: 'sqlite',
  database: ApplicationProperties.get().db.source.database,
  entities: [GameEntity, TableEntity, TeamEntity, PlayerEntity],
  logger: 'advanced-console',
  synchronize: true,
});

export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    logger.info(
      'DataSource has been initialized in/at: ' + dataSource.options.database,
    );
  } catch (e) {
    logger.error('Error during Data Source initialization:', e);
  }
};
