import {beforeEach, expect, test} from "bun:test";
import {SoccerTableHandler} from "../../../mqtt/soccerTable/handler/soccerTableHandler";
import {SoccerTable} from "../../../models/soccerTable";
import {GameEventType} from "../../../mqtt/game/events/gameEvent";
import {SoccerTableEvent} from "../../../mqtt/soccerTable/events/soccerTableEvent";

let soccerTableHandler: SoccerTableHandler = new SoccerTableHandler(new SoccerTable('table'))


beforeEach(() => {
  soccerTableHandler = new SoccerTableHandler(new SoccerTable('table'))
})

test('Game gets restarted correctly', () => {
  soccerTableHandler.gameHandler.triggerEvent(GameEventType.HOME_SCORE_INCREASE)

  expect(soccerTableHandler.subject.game.homeTeam.score).toEqual(1)

  soccerTableHandler.triggerEvent(SoccerTableEvent.NEW_GAME)

  expect(soccerTableHandler.subject.game.homeTeam.score).toEqual(0)
})