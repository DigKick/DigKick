import {beforeEach, expect, test} from "bun:test";
import {
  SoccerTableRegisterHandler,
  SoccerTableRegisterTopic,
} from "../../../mqtt/soccerTable/handler/soccerTableRegisterHandler";
import {SoccerTableHandler} from "../../../mqtt/soccerTable/handler/soccerTableHandler";

let soccerTableRegisterHandler: SoccerTableRegisterHandler;

beforeEach(() => {
  soccerTableRegisterHandler = new SoccerTableRegisterHandler();
  SoccerTableRegisterHandler.soccerTableHandlers = new Map<string, SoccerTableHandler>();
});

test("test valid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    "Valid ID",
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(1);
});

test("test invalid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    "",
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(0);
});

test("test undefined table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
  );

  expect(
    Array.from(SoccerTableRegisterHandler.soccerTableHandlers.entries()).length,
  ).toBe(0);
});
