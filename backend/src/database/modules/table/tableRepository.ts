import type {Table} from "../../../models/table.ts";
import {TableEntity} from "./tableEntity.ts";
import {TableParser} from "./tableParser.ts";
import {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {GameRepository} from "../game/gameRepository.ts";
import {QueryFailedError} from "typeorm";

export class TableRepository {
  private static logger: Logger = LoggerFactory.getLogger(GameRepository.name);

  public static async saveTable(table: Table) {
    try {
      const tableEntity = TableParser.toTableEntity(table)

      await TableEntity.save(tableEntity)

      return table
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (e.message.includes("SQLITE_CONSTRAINT: UNIQUE")) {
          this.logger.info(`Table "${table.name}" already persisted to the database.`)
        }
        return
      }
      this.logger.error(`Could not save or parse table: ${e}`)
    }
  }

  public static async getAllTables(): Promise<Table[]> {
    let allTableEntities

    try {
      allTableEntities = await TableEntity.find()
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === `DataSource is not set for this entity.`) {
          this.logger.warn("Could not register tables from database: ")
        }
      } else {
        this.logger.error("Error while trying to access tables from db: ", e)
      }
      return Promise.resolve([]);
    }

    return allTableEntities.map((tableEntity: TableEntity) => {
      return TableParser.toTable(tableEntity)
    })
  }

}