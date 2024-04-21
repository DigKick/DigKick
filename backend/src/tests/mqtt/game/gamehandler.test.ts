import {beforeEach, expect, mock, test} from "bun:test";
import {Game} from "../../../models/game";
import {GameHandler} from "../../../mqtt/game/handler/gamehandler";
import {GameEventType} from "../../../mqtt/game/events/gameEvents";


let gameHandler = new GameHandler()
let emptyMockFunc = mock()

let cbGame!: Game | undefined
const gameObs = (game: Game) => {
  cbGame = game
}


beforeEach(() => {
  gameHandler = new GameHandler()
  gameHandler.newGame()
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
  gameHandler.subscribe(GameEventType.START, emptyMockFunc)

  expect(Array.from(gameHandler.observerMap.values()).length).toEqual(1)
})

test('remove observer', () => {
  gameHandler.subscribe(GameEventType.START, emptyMockFunc)
  gameHandler.unsubscribe(emptyMockFunc)

  expect(Array.from(gameHandler.observerMap.values()).length).toEqual(0)
})

test('test callback', () => {
  gameHandler.subscribe(GameEventType.HOME_SCORE_CHANGE, emptyMockFunc)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)
  expect(emptyMockFunc.mock.calls.length).toEqual(1)
})

test('test new game event', () => {
  gameHandler.subscribe(GameEventType.START, emptyMockFunc)
  gameHandler.newGame()

  expect(emptyMockFunc.mock.calls.length).toEqual(1)
})

test('test event home increase', () => {
  gameHandler.subscribe(GameEventType.SCORE_CHANGE, gameObs)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)

  expect(cbGame!.homeTeam.score).toEqual(1)
})


test('test event home decrease', () => {
  gameHandler.subscribe(GameEventType.HOME_SCORE_DECREASE, gameObs)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_DECREASE)
  expect(cbGame!.homeTeam.score).toEqual(0)
})


test('test event guest increase', () => {
  subscribeObserverAndTriggerEvent(GameEventType.GUEST_SCORE_INCREASE)
  expect(cbGame!.guestTeam.score).toEqual(1)
})


test('test event guest decrease', () => {
  subscribeObserverAndTriggerEvent(GameEventType.GUEST_SCORE_INCREASE)
  gameHandler.triggerEvent(GameEventType.GUEST_SCORE_DECREASE)

  expect(cbGame!.guestTeam.score).toEqual(0)
})

test(`test trigger all events`, () => {
  Object.values(GameEventType).forEach((event: GameEventType) => {
    if (event.includes('_')) {
      // sort out values
      return
    }
    subscribeMockAndTriggerEvent(event)
    expect(emptyMockFunc.mock.calls.length).toBe(1)
    emptyMockFunc = mock()
  })
})