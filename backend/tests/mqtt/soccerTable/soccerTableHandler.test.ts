import {beforeEach, expect, mock, test} from "bun:test";
import {TableHandler} from "../../../src/mqtt/table/handler/tableHandler.ts";
import {Table} from "../../../src/models/table.ts";
import {TableEventType} from "../../../src/mqtt/table/events/tableEventType.ts";
import {GameEventType} from "../../../src/mqtt/game/events/gameEvent.ts";

let emptyMockFunc = mock();
let soccerTableHandler: TableHandler = new TableHandler(
  new Table("table"),
);
let soccerTableCb: Table = new Table("gameId");
const soccerTableCallback = (soccerTable: Table) => {
  soccerTableCb = soccerTable;
};

const subscribeObserverAndTriggerEvent = (event: TableEventType) => {
  soccerTableHandler.subscribe(event, soccerTableCallback);
  soccerTableHandler.triggerEvent(event, "", {});
};

const subscribeMockAndTriggerEvent = (event: TableEventType) => {
  soccerTableHandler.subscribe(event, emptyMockFunc);
  soccerTableHandler.triggerEvent(event, "", {});
};

beforeEach(() => {
  soccerTableHandler = new TableHandler(new Table("table"));
  emptyMockFunc = mock();
  soccerTableCb = new Table("gameId");
});

test("Game gets restarted correctly", () => {
  soccerTableHandler.gameHandler.triggerEvent(
    GameEventType.WHITE_SCORE_INCREASE,
    "",
    {}
  );

  expect(soccerTableHandler.gameHandler.subject.teamWhite.score).toBe(1);

  soccerTableHandler.triggerEvent(TableEventType.NEW_GAME, "", {});

  expect(soccerTableHandler.gameHandler.subject.teamWhite.score).toBe(0);
});

test(`test trigger all events`, () => {
  Object.values(TableEventType).forEach((event: TableEventType) => {
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

  subscribeObserverAndTriggerEvent(TableEventType.NEW_GAME);

  expect(preTableHandler).not.toBe(soccerTableCb);
});

test(`test cancel game event`, () => {
  const preTableHandler = soccerTableCb;

  subscribeObserverAndTriggerEvent(TableEventType.CANCEL_GAME);

  expect(preTableHandler).not.toBe(soccerTableCb);
});

test(`test finish game event`, () => {
  const preTableHandler = soccerTableCb;

  subscribeObserverAndTriggerEvent(TableEventType.FINISH_GAME);

  expect(preTableHandler).not.toBe(soccerTableCb);
});
