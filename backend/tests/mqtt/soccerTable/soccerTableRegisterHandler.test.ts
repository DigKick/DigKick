import {beforeEach, expect, test} from "bun:test";
import {SoccerTableRegisterTopic, TableRegisterHandler,} from "../../../src/mqtt/table/handler/tableRegisterHandler.ts";
import {TableHandler} from "../../../src/mqtt/table/handler/tableHandler.ts";
import type {TableRegisterPayload} from "../../../src/mqtt/table/payloads/tableRegisterPayload.ts";

let soccerTableRegisterHandler: TableRegisterHandler;

const validTableRegisterPayload: TableRegisterPayload = {
  name: "validId",
};

const invalidTableRegisterPayload: TableRegisterPayload = {
  name: "",
};

const invalidUndefinedTableRegisterPayload: TableRegisterPayload = {
  // @ts-ignore
  tableId: undefined,
};

beforeEach(() => {
  soccerTableRegisterHandler = new TableRegisterHandler();
  TableRegisterHandler.tableHandlers = new Map<
    string,
    TableHandler
  >();
});

test("test valid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    validTableRegisterPayload,
  );

  expect(
    Array.from(TableRegisterHandler.tableHandlers.entries()).length,
  ).toBe(1);
});

test("test invalid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    invalidTableRegisterPayload,
  );

  expect(
    Array.from(TableRegisterHandler.tableHandlers.entries()).length,
  ).toBe(0);
});

test("test undefined table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    invalidUndefinedTableRegisterPayload,
  );

  expect(
    Array.from(TableRegisterHandler.tableHandlers.entries()).length,
  ).toBe(0);
});
