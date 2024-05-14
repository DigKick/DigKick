import type {EventMapper} from "../../abstract/eventMapper";
import {GameEventType} from "./gameEvent";
import {Game} from "../../../models/game";
import {ScoreChange, TeamColor} from "../../../models/team";
import {SoccerTable} from "../../../models/soccerTable";
import {SoccerTableHandler} from "../../soccerTable/handler/soccerTableHandler";
import {DkMqttClient} from "../../client/client";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {ScorePayload} from "../payloads/ScorePayload";
import {WinnerTeamPayload} from "../payloads/WinnerTeamPayload";

export class GameEventMapper implements EventMapper<GameEventType>{

  private readonly _game: Game
  private readonly _soccerTable: SoccerTable

  constructor(soccerTable: SoccerTable) {
    this._soccerTable = soccerTable;
    this._game = soccerTable.game;
  }

  map(event: GameEventType) {
    const prevGame: Game = structuredClone(this._game)
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance()
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

      if (event.includes(TeamColor.WHITE)) {
        triggeredEvents.push(GameEventType.WHITE_SCORE_CHANGE)
        dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.whiteTeam.score)))
      }
      if (event.includes(TeamColor.BLACK)) {
        triggeredEvents.push(GameEventType.BLACK_SCORE_CHANGE)
        dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.blackTeam.score)))
      }
    }

    if (prevGame?.winnerTeam !== this._game?.winnerTeam) {
      triggeredEvents.push(GameEventType.WINNER_CHANGE)
      if (this._game.winnerTeam) {
        dkMqttClient.publishWithRetain(BaseTopicFactory.getBaseTopic(this._soccerTable) + "/winner", JSON.stringify(new WinnerTeamPayload(this._game.winnerTeam)))
      }

    }


    return new Set(triggeredEvents)
  }
}