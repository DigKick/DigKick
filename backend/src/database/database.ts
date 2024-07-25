import {Database} from "bun:sqlite"
import {DataSource} from "typeorm"
import {GameEntity} from "./modules/game/gameEntity.ts";
import {TableEntity} from "./modules/table/tableEntity.ts";
import {TeamEntity} from "./modules/team/teamEntity.ts";
import {Logger} from "winston";
import {LoggerFactory} from "../logging/loggerFactory.ts";
import {PlayerEntity} from "./modules/player/playerEntity.ts";
import {ApplicationProperities} from "../util/properties/applicationProperities.ts";

const logger: Logger = LoggerFactory.getLogger("DataSourceInitializer");
new Database(`${ApplicationProperities.properties.db?.file?.name}.${ApplicationProperities.properties.db?.file?.suffix}`)

export const dataSource: DataSource = new DataSource({
  type: "sqlite",
  database: `${ApplicationProperities.properties.db?.file?.name}.${ApplicationProperities.properties.db?.file?.name}`,
  entities: [GameEntity, TableEntity, TeamEntity, PlayerEntity],
  logger: "advanced-console",
  synchronize: true,
})


export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    logger.info("DataSource has been initialized in/at: " + dataSource.options.database);
  } catch (e) {
    logger.error("Error during Data Source initialization:", e);
  }
};