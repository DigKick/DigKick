import {beforeEach, expect, mock, test} from "bun:test";
import {SoccerTableHandler} from "../../../src/mqtt/soccerTable/handler/soccerTableHandler.ts";
import {Table} from "../../../src/models/table.ts";
import {SoccerTableEventType} from "../../../src/mqtt/soccerTable/events/soccerTableEventType.ts";
import {GameEventType} from "../../../src/mqtt/game/events/gameEvent.ts";

let emptyMockFunc = mock();
let soccerTableHandler: SoccerTableHandler = new SoccerTableHandler(
  new Table("table"),
);
let soccerTableCb: Table = new Table("gameId");
const soccerTableCallback = (soccerTable: Table) => {
  soccerTableCb = soccerTable;
};

const subscribeObserverAndTriggerEvent = (event: SoccerTableEventType) => {
  soccerTableHandler.subscribe(event, soccerTableCallback);
  soccerTableHandler.triggerEvent(event);
};

const subscribeMockAndTriggerEvent = (event: SoccerTableEventType) => {
  soccerTableHandler.subscribe(event, emptyMockFunc);
  soccerTableHandler.triggerEvent(event);
};

beforeEach(() => {
  soccerTableHandler = new SoccerTableHandler(new Table("table"));
  emptyMockFunc = mock();
  soccerTableCb = new Table("gameId");
});

test("Game gets restarted correctly", () => {
  soccerTableHandler.gameHandler.triggerEvent(
    GameEventType.WHITE_SCORE_INCREASE,
  );

  expect(soccerTableHandler.gameHandler.subject.teamWhite.score).toBe(1);

  soccerTableHandler.triggerEvent(SoccerTableEventType.NEW_GAME);

  expect(soccerTableHandler.gameHandler.subject.teamWhite.score).toBe(0);
});

test(`test trigger all events`, () => {
  Object.values(SoccerTableEventType).forEach((event: SoccerTableEventType) => {
    if (!event.includes(".")) {
      // sort out values
      return;
    }
    subscribeMockAndTriggerEvent(event);
    expect(emptyMockFunc.mock.calls.length).toBe(1);
    emptyMockFunc = mock();
  });
});

test(`test new game event`, () => {
  const preTableHandler = soccerTableCb;

  subscribeObserverAndTriggerEvent(SoccerTableEventType.NEW_GAME);

  expect(preTableHandler).not.toBe(soccerTableCb);
});

test(`test cancel game event`, () => {
  const preTableHandler = soccerTableCb;

  subscribeObserverAndTriggerEvent(SoccerTableEventType.CANCEL_GAME);

  expect(preTableHandler).not.toBe(soccerTableCb);
});

test(`test finish game event`, () => {
  const preTableHandler = soccerTableCb;

  subscribeObserverAndTriggerEvent(SoccerTableEventType.FINISH_GAME);

  expect(preTableHandler).not.toBe(soccerTableCb);
});
