import {beforeEach, expect, mock, test} from "bun:test";
import {Game} from "../../../models/game";
import {GameHandler} from "../../../mqtt/game/handler/gamehandler";
import {GameEventType} from "../../../mqtt/game/events/gameevents";


let gameObj = new Game('gameId');
let gameHandler = new GameHandler(gameObj)
let emptyMockFunc = mock()

let cbGame!: Game | undefined
const gameObs = (game: Game) => {
  cbGame = game
}


beforeEach(() => {
  gameObj = new Game('gameId');
  gameHandler = new GameHandler(gameObj)
  emptyMockFunc = mock()
  cbGame = undefined
})


test('add new observer', () => {
  gameHandler.subscribe(emptyMockFunc)

  expect(gameHandler.observers.length).toEqual(1)
})

test('remove observer', () => {
  gameHandler.subscribe(emptyMockFunc)
  gameHandler.unsubscribe(emptyMockFunc)

  expect(gameHandler.observers.length).toEqual(0)
})

test('test callback', () => {
  gameHandler.subscribe(emptyMockFunc)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)
  expect(emptyMockFunc.mock.calls.length).toEqual(1)
})

test('test event home increase', () => {
  gameHandler.subscribe(gameObs)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)

  expect(cbGame!.homeTeam.score).toEqual(1)
})


test('test event home decrease', () => {
  gameHandler.subscribe(gameObs)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)
  gameHandler.triggerEvent(GameEventType.HOME_SCORE_DECREASE)
  expect(cbGame!.homeTeam.score).toEqual(0)
})


test('test event guest increase', () => {
  gameHandler.subscribe(gameObs)
  gameHandler.triggerEvent(GameEventType.GUEST_SCORE_INCREASE)

  expect(cbGame!.guestTeam.score).toEqual(1)
})


test('test event guest decrease', () => {
  gameHandler.subscribe(gameObs)
  gameHandler.triggerEvent(GameEventType.GUEST_SCORE_INCREASE)
  gameHandler.triggerEvent(GameEventType.GUEST_SCORE_DECREASE)

  expect(cbGame!.guestTeam.score).toEqual(0)
})

test('test invalid event type', () => {
  expect(() => {
    gameHandler.triggerEvent(GameEventType._INCREASE)
  }).toThrowError(Error)
})
