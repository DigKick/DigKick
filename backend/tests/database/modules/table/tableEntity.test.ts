import {beforeEach, expect, test} from "bun:test";
import {TableEntity} from "../../../../src/database/modules/table/tableEntity.ts";
import {createNewTestDatabase} from "../testDatabaseSetup.ts";
import {createValidTable} from "./tableParser.test.ts";
import {TableRepository} from "../../../../src/database/modules/table/tableRepository.ts";

beforeEach(async () => {
  await createNewTestDatabase()
})

test('save table to database', async () => {
  await TableRepository.saveTable(createValidTable())

  const searchedTable = await TableEntity.findOneBy({name: createValidTable().name})

  expect(searchedTable).not.toBeUndefined()
})

test('save multiple tables to database', async () => {
  const secondTable = createValidTable()
  secondTable.name = "second Test table"

  await TableRepository.saveTable(createValidTable())
  await TableRepository.saveTable(secondTable)

  const firstTableFromDb = await TableEntity.findOneBy({name: createValidTable().name})
  const secondTableFromDb = await TableEntity.findOneBy({name: secondTable.name})

  expect(firstTableFromDb?.id).toBe(1)
  expect(secondTableFromDb?.id).toBe(2)
})
