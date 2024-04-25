import {beforeEach, expect, mock, test} from "bun:test";
import {SoccerTableHandler} from "../../../mqtt/soccerTable/handler/soccerTableHandler";
import {SoccerTable} from "../../../models/soccerTable";
import {SoccerTableEvent} from "../../../mqtt/soccerTable/events/soccerTableEvent";
import {GameEventType} from "../../../mqtt/game/events/gameEvent";

let emptyMockFunc = mock()
let soccerTableHandler: SoccerTableHandler = new SoccerTableHandler(new SoccerTable('table'))
let soccerTableCb: SoccerTable = new SoccerTable('gameId')
const soccerTableCallback = (soccerTable: SoccerTable) => {
  soccerTableCb = soccerTable
}

const subscribeObserverAndTriggerEvent = (event: SoccerTableEvent) => {
  soccerTableHandler.subscribe(event, soccerTableCallback)
  soccerTableHandler.triggerEvent(event)
}

const subscribeMockAndTriggerEvent = (event: SoccerTableEvent) => {
  soccerTableHandler.subscribe(event, emptyMockFunc)
  soccerTableHandler.triggerEvent(event)
}

beforeEach(() => {
  soccerTableHandler = new SoccerTableHandler(new SoccerTable('table'))
  emptyMockFunc = mock()
  soccerTableCb = new SoccerTable('gameId')
})

test('Game gets restarted correctly', () => {

  soccerTableHandler.gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)

  expect(soccerTableHandler.gameHandler.subject.homeTeam.score).toBe(1)

  soccerTableHandler.triggerEvent(SoccerTableEvent.NEW_GAME)

  expect(soccerTableHandler.gameHandler.subject.homeTeam.score).toBe(0)
})

test(`test trigger all events`, () => {
  Object.values(SoccerTableEvent).forEach((event: SoccerTableEvent) => {
    if (!event.includes('.')) {
      // sort out values
      return
    }
    subscribeMockAndTriggerEvent(event)
    expect(emptyMockFunc.mock.calls.length).toBe(1)
    emptyMockFunc = mock()
  })
})

test(`test new game event`, () => {
  const preTableHandler = (soccerTableCb)

  subscribeObserverAndTriggerEvent(SoccerTableEvent.NEW_GAME)

  expect(preTableHandler).not.toBe(soccerTableCb)
})

test(`test cancel game event`, () => {
  const preTableHandler = (soccerTableCb)

  subscribeObserverAndTriggerEvent(SoccerTableEvent.CANCEL_GAME)

  expect(preTableHandler).not.toBe(soccerTableCb)
})

test(`test finish game event`, () => {
  const preTableHandler = (soccerTableCb)

  subscribeObserverAndTriggerEvent(SoccerTableEvent.FINISH_GAME)

  expect(preTableHandler).not.toBe(soccerTableCb)
})

test(``, () => {

})