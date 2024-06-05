import {TableEntity} from "../../../../database/modules/table/tableEntity.ts";
import {expect, test} from "bun:test";
import {TableParser} from "../../../../database/modules/table/tableParser.ts";
import {Table} from "../../../../models/table.ts";


function createValidTableEntity() {
  const validTableEntity: TableEntity = new TableEntity()

  validTableEntity.name = "tableForTest"

  return validTableEntity
}

function createValidTable() {
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