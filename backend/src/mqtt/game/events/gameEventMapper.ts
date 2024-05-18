import type {EventMapper} from "../../abstract/eventMapper";
import {GameEventType} from "./gameEvent";
import {Game} from "../../../models/game";
import {ScoreChange, Team, TeamColor} from "../../../models/team";
import {SoccerTable} from "../../../models/soccerTable";
import {DkMqttClient} from "../../client/client";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {WinnerTeamPayload} from "../payloads/WinnerTeamPayload";
import {MqttObjectUpdater} from "../../util/mqttObjectUpdater/mqttObjectUpdater";
import {BasicTerm} from "../../util/basicTerm";
import {MqttObjectUpdaterFactory} from "../../util/mqttObjectUpdater/mqttObjectUpdaterFactory";

export class GameEventMapper implements EventMapper<GameEventType> {

  private readonly _game: Game
  private readonly _soccerTable: SoccerTable
  private readonly _mqttObjectUpdaterGame: MqttObjectUpdater<Game>
  private readonly _mqttObjectUpdaterTeamWhite: MqttObjectUpdater<Team>
  private readonly _mqttObjectUpdaterTeamBlack: MqttObjectUpdater<Team>

  constructor(soccerTable: SoccerTable) {
    this._soccerTable = soccerTable;
    this._game = soccerTable.game;
    this._mqttObjectUpdaterGame = MqttObjectUpdaterFactory.getMqttObjectUpdater(this._game, {prefix: `/${BasicTerm.TABLE}/${this._soccerTable.id}/${BasicTerm.GAME}`, instantPublish: true, publishWithRetain: false, maxDepth: 4})
    this._mqttObjectUpdaterTeamWhite = MqttObjectUpdaterFactory.getMqttObjectUpdater(this._game.teamWhite, {prefix: `/${BasicTerm.TABLE}/${this._soccerTable.id}/${BasicTerm.GAME}/${BasicTerm.TEAM}/${TeamColor.WHITE}`, instantPublish: true, publishWithRetain: false, maxDepth: 4})
    this._mqttObjectUpdaterTeamBlack = MqttObjectUpdaterFactory.getMqttObjectUpdater(this._game.teamBlack, {prefix: `/${BasicTerm.TABLE}/${this._soccerTable.id}/${BasicTerm.GAME}/${BasicTerm.TEAM}/${TeamColor.BLACK}`, instantPublish: true, publishWithRetain: false, maxDepth: 4})

  }


  map(event: GameEventType) {
    const prevGame: Game = structuredClone(this._game)
    const dkMqttClient: DkMqttClient = DkMqttClient.getInstance()
    let triggeredEvents = [event]

    switch (event) {
      case GameEventType.WHITE_SCORE_CHANGE:
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.teamWhite.score)))
        break;
      case GameEventType.WHITE_SCORE_INCREASE:
        this._game.updateWhiteTeamScore(ScoreChange.INCREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.teamWhite.score)))
        break;
      case GameEventType.WHITE_SCORE_DECREASE:
        this._game.updateWhiteTeamScore(ScoreChange.DECREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.WHITE) + "/score", JSON.stringify(new ScorePayload(this._game.teamWhite.score)))
        break;
      case GameEventType.BLACK_SCORE_CHANGE:
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.teamBlack.score)))
        break;
      case GameEventType.BLACK_SCORE_INCREASE:
        this._game.updateBlackTeamScore(ScoreChange.INCREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.teamBlack.score)))
        break;
      case GameEventType.BLACK_SCORE_DECREASE:
        this._game.updateBlackTeamScore(ScoreChange.DECREASE);
        // dkMqttClient.publishWithRetain(BaseTopicFactory.getTeamTopic(this._soccerTable, TeamColor.BLACK) + "/score", JSON.stringify(new ScorePayload(this._game.teamBlack.score)))
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

    this.publishNewGameValues()
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
    this._mqttObjectUpdaterGame.commit(this._game)
    this._mqttObjectUpdaterGame.publish()
  }
}