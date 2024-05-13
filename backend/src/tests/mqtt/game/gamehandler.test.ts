import {beforeEach, expect, mock, test} from "bun:test";
import {Game} from "../../../models/game";
import {GameHandler} from "../../../mqtt/game/handler/gameHandler";
import {GameEventType} from "../../../mqtt/game/events/gameEvent";
import {SoccerTable} from "../../../models/soccerTable";


let gameHandler = new GameHandler(new SoccerTable('table'))
let emptyMockFunc = mock()

let cbGame!: Game | undefined
const gameObs = (game: Game) => {
  cbGame = game
}


beforeEach(() => {
  gameHandler = new GameHandler(new SoccerTable('table'))
  emptyMockFunc = mock()
  cbGame = undefined
})

const subscribeObserverAndTriggerEvent = (event: GameEventType) => {
  gameHandler.subscribe(event, gameObs)
  gameHandler.triggerEvent(event)
}

const subscribeMockAndTriggerEvent = (event: GameEventType) => {
  gameHandler.subscribe(event, emptyMockFunc)
  gameHandler.triggerEvent(event)
}

test('add new observer', () => {
  gameHandler.subscribe(GameEventType.WHITE_SCORE_CHANGE, emptyMockFunc)

  expect(Array.from(gameHandler.observerMap.values()).length).toEqual(1)
})

test('remove observer', () => {
  gameHandler.subscribe(GameEventType.WHITE_SCORE_CHANGE, emptyMockFunc)
  gameHandler.unsubscribe(emptyMockFunc)

  expect(Array.from(gameHandler.observerMap.values()).length).toEqual(0)
})

test('test callback', () => {
  gameHandler.subscribe(GameEventType.WHITE_SCORE_CHANGE, emptyMockFunc)
  gameHandler.triggerEvent(GameEventType.WHITE_SCORE_INCREASE)
  expect(emptyMockFunc.mock.calls.length).toEqual(1)
})

test('test event white score increase', () => {
  gameHandler.subscribe(GameEventType.SCORE_CHANGE, gameObs)
  gameHandler.triggerEvent(GameEventType.WHITE_SCORE_INCREASE)

  expect(cbGame!.whiteTeam.score).toEqual(1)
})


test('test event white team score decrease', () => {
  gameHandler.subscribe(GameEventType.WHITE_SCORE_DECREASE, gameObs)
  gameHandler.triggerEvent(GameEventType.WHITE_SCORE_INCREASE)
  gameHandler.triggerEvent(GameEventType.WHITE_SCORE_DECREASE)
  expect(cbGame!.whiteTeam.score).toEqual(0)
})


test('test event black team score increase', () => {
  subscribeObserverAndTriggerEvent(GameEventType.BLACK_SCORE_INCREASE)
  expect(cbGame!.blackTeam.score).toEqual(1)
})


test('test event black score decrease', () => {
  subscribeObserverAndTriggerEvent(GameEventType.BLACK_SCORE_INCREASE)
  gameHandler.triggerEvent(GameEventType.BLACK_SCORE_DECREASE)

  expect(cbGame!.blackTeam.score).toEqual(0)
})

test(`test trigger all events`, () => {
  Object.values(GameEventType).forEach((event: GameEventType) => {
    if (!event.includes('.')) {
      // sort out values
      return
    }
    subscribeMockAndTriggerEvent(event)
    expect(emptyMockFunc.mock.calls.length).toBe(1)
    emptyMockFunc = mock()
  })
})