import {beforeEach, expect, mock, test} from "bun:test";
import {Game} from "../../../models/game";
import {GameHandler} from "../../../mqtt/game/handler/gamehandler";
import {GameEventType} from "../../../mqtt/game/events/gameevents";


let gameObj = new Game('gameId');
let gameHandler = new GameHandler(gameObj)

const emptyMockFunc = mock()
beforeEach(() => {
  gameObj = new Game('gameId');
  gameHandler = new GameHandler(gameObj)
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
  let cbGame!: Game

  gameHandler.subscribe((game: Game) => {
    cbGame = game
  })

  gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)

  expect(cbGame.homeTeam.score).toEqual(1)
})
