import {expect, test} from "bun:test";
import {TableEntity} from "../../../../src/database/modules/table/tableEntity.ts";
import {TableParser} from "../../../../src/database/modules/table/tableParser.ts";
import {Table} from "../../../../src/models/table.ts";

function createValidTableEntity() {
  const validTableEntity: TableEntity = new TableEntity()

  validTableEntity.name = "tableForTest"

  return validTableEntity
}

export function createValidTable() {
  return new Table("tableForTest")
}


test("valid parse TableEntity to Table: name field", () => {
  const parsedTable: Table = TableParser.toTable(createValidTableEntity())

  expect(parsedTable.name).not.toBeUndefined()
})

test('valid parse Table to TableEntity: name field', () => {
  const parsedTableEntity: TableEntity = TableParser.toTableEntity(createValidTable())

  expect(parsedTableEntity.name).not.toBeUndefined()
})
