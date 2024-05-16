import type {EventMapper} from "../../abstract/eventMapper";
import {GameEventType} from "./gameEvent";
import {Game} from "../../../models/game";
import {ScoreChange, TeamColor} from "../../../models/team";
import {SoccerTable} from "../../../models/soccerTable";
import {DkMqttClient} from "../../client/client";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {WinnerTeamPayload} from "../payloads/WinnerTeamPayload";
import {MqttObjectUpdater} from "../../util/mqttObjectUpdater";
import {BasicTerm} from "../../util/basicTerm";

export class GameEventMapper implements EventMapper<GameEventType> {

  private readonly _game: Game
  private readonly _soccerTable: SoccerTable
  private _mqttObjectUpdater: MqttObjectUpdater<Game>

  constructor(soccerTable: SoccerTable) {
    this._soccerTable = soccerTable;
    this._game = soccerTable.game;
    this._mqttObjectUpdater = new MqttObjectUpdater<Game>(this._game,
      {prefix: `/${BasicTerm.TABLE}/${soccerTable.id}`, publishWithRetain: true, instantPublish: true})
  }

  map(event: GameEventType) {
    const prevGame: Game = structuredClone(this._game)
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance()
    let triggeredEvents = [event]

    switch (event) {
      case GameEventType.WHITE_SCORE_CHANGE:
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.teamWhite.score)))
        this.publishNewGameValues()
        break;
      case GameEventType.WHITE_SCORE_INCREASE:
        this._game.updateWhiteTeamScore(ScoreChange.INCREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.teamWhite.score)))
        this.publishNewGameValues()
        break;
      case GameEventType.WHITE_SCORE_DECREASE:
        this._game.updateWhiteTeamScore(ScoreChange.DECREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.teamWhite.score)))
        this.publishNewGameValues()
        break;
      case GameEventType.BLACK_SCORE_CHANGE:
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.teamBlack.score)))
        this.publishNewGameValues()
        break;
      case GameEventType.BLACK_SCORE_INCREASE:
        this._game.updateBlackTeamScore(ScoreChange.INCREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.teamBlack.score)))
        this.publishNewGameValues()
        break;
      case GameEventType.BLACK_SCORE_DECREASE:
        this._game.updateBlackTeamScore(ScoreChange.DECREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.teamBlack.score)))
        this.publishNewGameValues()
        break;
      default:
        break;
    }

    triggeredEvents.concat(this._triggerScoreUpdates(event))

    if (prevGame?.winnerTeam !== this._game?.winnerTeam) {
      triggeredEvents.push(GameEventType.WINNER_CHANGE)
      if (this._game.winnerTeam) {
        dkMqttClient.publishWithRetain(BaseTopicFactory.getBaseTopic(this._soccerTable) + "/winner", JSON.stringify(new WinnerTeamPayload(this._game.winnerTeam)))
      }
    }


    return new Set(triggeredEvents)
  }

  private _triggerScoreUpdates(event: GameEventType) {
    const triggeredEvents: GameEventType[] = []
    if (event.includes(GameEventType.SCORE_DECREASE) || event.includes(GameEventType.SCORE_INCREASE)) {
      triggeredEvents.push(GameEventType.SCORE_CHANGE)

      if (event.includes(TeamColor.WHITE)) {
        triggeredEvents.push(GameEventType.WHITE_SCORE_CHANGE)
      }
      if (event.includes(TeamColor.BLACK)) {
        triggeredEvents.push(GameEventType.BLACK_SCORE_CHANGE)
      }
    }
    return triggeredEvents
  }

  private publishNewGameValues() {
    this._mqttObjectUpdater.commit(this._game)
    this._mqttObjectUpdater.publish()
  }
}