import {beforeEach, expect, test} from "bun:test";
import {
  SoccerTableRegisterHandler,
  SoccerTableRegisterTopic,
} from "../../../src/mqtt/soccerTable/handler/soccerTableRegisterHandler.ts";
import {SoccerTableHandler} from "../../../src/mqtt/soccerTable/handler/soccerTableHandler.ts";
import type {TableRegisterPayload} from "../../../src/mqtt/soccerTable/payloads/tableRegisterPayload.ts";

let soccerTableRegisterHandler: SoccerTableRegisterHandler;

const validTableRegisterPayload: TableRegisterPayload = {
  id: "validId",
};

const invalidTableRegisterPayload: TableRegisterPayload = {
  id: "",
};

const invalidUndefinedTableRegisterPayload: TableRegisterPayload = {
  // @ts-ignore
  tableId: undefined,
};

beforeEach(() => {
  soccerTableRegisterHandler = new SoccerTableRegisterHandler();
  SoccerTableRegisterHandler.soccerTableHandlers = new Map<
    string,
    SoccerTableHandler
  >();
});

test("test valid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    validTableRegisterPayload,
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(1);
});

test("test invalid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    invalidTableRegisterPayload,
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(0);
});

test("test undefined table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    invalidUndefinedTableRegisterPayload,
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(0);
});
