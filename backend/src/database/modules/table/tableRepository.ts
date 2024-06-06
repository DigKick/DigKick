import type {Table} from "../../../models/table.ts";
import {TableEntity} from "./tableEntity.ts";
import {TableParser} from "./tableParser.ts";
import {Logger} from "winston";
import {LoggerFactory} from "../../../logging/loggerFactory.ts";
import {GameRepository} from "../game/gameRepository.ts";

export class TableRepository {
  private static logger: Logger = LoggerFactory.getLogger(GameRepository.name);

  public static async saveTable(table: Table) {
    try {
      const tableEntity = TableParser.toTableEntity(table)

      await TableEntity.save(tableEntity)
    } catch (e) {
      this.logger.error(`Could not save or parse table: ${e}`)
    }
  }

}