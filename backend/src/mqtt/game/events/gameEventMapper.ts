import type {EventMapper} from "../../abstract/eventMapper";
import {GameEventType} from "./gameEvent";
import {Game} from "../../../models/game";
import {ScoreChange} from "../../../models/team";

export class GameEventMapper implements EventMapper<GameEventType>{

  private readonly _game: Game

  constructor(game: Game) {
    this._game = game;
  }

  map(event: GameEventType) {
    const prevGame: Game = structuredClone(this._game)
    let triggeredEvents = [event]

    switch (event) {
      case GameEventType.WHITE_SCORE_INCREASE:
        this._game.updateWhiteTeamScore(ScoreChange.INCREASE);
        break;
      case GameEventType.WHITE_SCORE_DECREASE:
        this._game.updateWhiteTeamScore(ScoreChange.DECREASE);
        break;
      case GameEventType.BLACK_SCORE_INCREASE:
        this._game.updateBlackTeamScore(ScoreChange.INCREASE);
        break;
      case GameEventType.BLACK_SCORE_DECREASE:
        this._game.updateBlackTeamScore(ScoreChange.DECREASE);
        break;
      default:
        break;
    }

    if (event.includes(GameEventType.SCORE_DECREASE) || event.includes(GameEventType.SCORE_INCREASE)) {
      triggeredEvents.push(GameEventType.SCORE_CHANGE)

      if (event.includes(GameEventType._HOME)) {
        triggeredEvents.push(GameEventType.WHITE_SCORE_CHANGE)
      } else {
        triggeredEvents.push(GameEventType.BLACK_SCORE_CHANGE)
      }
    }

    if (prevGame.winnerTeam !== this._game.winnerTeam) {
      triggeredEvents.push(GameEventType.WINNER_CHANGE)
    }

    return new Set(triggeredEvents)
  }
}