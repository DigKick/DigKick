import {TableEntity} from "./tableEntity.ts";
import {Table} from "../../../models/table.ts";
import {DkParseException} from "../../DkParseException.ts";

export class TableParser {

  public static toTable(tableEntity: TableEntity): Table {
    try {
      return new Table(tableEntity.name)
    } catch (e) {
      throw new DkParseException(TableEntity.constructor.name, Table.constructor.name)
    }
  }

  public static toTableEntity(table: Table): TableEntity {
    try {
      const tableEntity = new TableEntity();
      tableEntity.name = table.name;
      return tableEntity;
    } catch (e) {
      throw new DkParseException(Table.constructor.name, TableEntity.constructor.name)
    }
  }

}