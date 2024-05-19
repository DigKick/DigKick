import {beforeEach, expect, test} from "bun:test";
import {
  SoccerTableRegisterHandler,
  SoccerTableRegisterTopic,
} from "../../../mqtt/soccerTable/handler/soccerTableRegisterHandler";
import {SoccerTableHandler} from "../../../mqtt/soccerTable/handler/soccerTableHandler";
import type {TableRegisterPayload} from "../../../mqtt/soccerTable/payloads/tableRegisterPayload";

let soccerTableRegisterHandler: SoccerTableRegisterHandler;

const validTableRegisterPayload: TableRegisterPayload = {
  id: "validId"
}

const invalidTableRegisterPayload: TableRegisterPayload = {
  id: ""
}


const invalidUndefinedTableRegisterPayload: TableRegisterPayload = {
  // @ts-ignore
  tableId: undefined
}

beforeEach(() => {
  soccerTableRegisterHandler = new SoccerTableRegisterHandler();
  SoccerTableRegisterHandler.soccerTableHandlers = new Map<string, SoccerTableHandler>();
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
    SoccerTableRegisterTopic.REGISTER, invalidUndefinedTableRegisterPayload
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(0);
});
