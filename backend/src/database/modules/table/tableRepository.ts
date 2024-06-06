import type {Table} from "../../../models/table.ts";
import {TableEntity} from "./tableEntity.ts";
import {TableParser} from "./tableParser.ts";

export class TableRepository {

  public static async saveTable(table: Table) {
    try {
      const tableEntity = TableParser.toTableEntity(table)

      await TableEntity.save(tableEntity)
    } catch (e) {

    }
  }

}