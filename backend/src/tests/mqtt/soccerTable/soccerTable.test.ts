import {beforeEach, expect, mock, test} from "bun:test";
import {SoccerTableHandler} from "../../../mqtt/soccerTable/handler/soccerTableHandler";
import {SoccerTable} from "../../../models/soccerTable";
import {SoccerTableEvent} from "../../../mqtt/soccerTable/events/soccerTableEvent";

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
  const beforeGame = (soccerTableHandler.subject.game)

  soccerTableHandler.triggerEvent(SoccerTableEvent.NEW_GAME)

  expect(soccerTableHandler.subject.game).not.toBe(beforeGame)
})

test(`test trigger all events`, () => {
  emptyMockFunc = mock()
  Object.values(SoccerTableEvent).forEach((event: SoccerTableEvent) => {
    emptyMockFunc = mock()
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