import {Database} from "bun:sqlite"
import {DataSource} from "typeorm"
import {GameEntity} from "../models/gameEntity.ts";
import {TableEntity} from "../models/tableEntity.ts";
import {TeamEntity} from "../models/teamEntity.ts";
import {Logger} from "winston";
import {LoggerFactory} from "../../logging/loggerFactory.ts";


const logger: Logger = LoggerFactory.getLogger("DatabaseHandler");
const database = new Database("database.db")

export const dataSource: DataSource = new DataSource({
  type: "sqlite",
  database: "database.db",
  entities: [GameEntity, TableEntity, TeamEntity],
  logger: "advanced-console",
  synchronize: true,
  migrations: ['../models/*.ts']
})


export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    logger.info("Data Source has been initialized!");
  } catch (err) {
    logger.info("Error during Data Source initialization:", err);
  }
};