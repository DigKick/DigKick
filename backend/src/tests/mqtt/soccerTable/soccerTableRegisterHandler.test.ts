import { beforeEach, expect, test } from "bun:test";
import {
  SoccerTableRegisterHandler,
  SoccerTableRegisterTopic,
} from "../../../mqtt/soccerTable/handler/soccerTableRegisterHandler";

let soccerTableRegisterHandler: SoccerTableRegisterHandler;

beforeEach(() => {
  soccerTableRegisterHandler = new SoccerTableRegisterHandler();
});

test("test valid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    "Valid ID",
  );

  expect(soccerTableRegisterHandler.soccerTableHandlers.length).toBe(1);
});

test("test invalid table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
    "",
  );

  expect(soccerTableRegisterHandler.soccerTableHandlers.length).toBe(0);
});

test("test undefined table id", () => {
  soccerTableRegisterHandler.registerSubscriber.func(
    SoccerTableRegisterTopic.REGISTER,
  );

  expect(soccerTableRegisterHandler.soccerTableHandlers.length).toBe(0);
});
