import type { EventMapper } from '../../global/eventMapper';
import { GameEventType } from './gameEvent';
import { Game } from '../../../models/game';
import { ScoreChange, TeamColor } from '../../../models/team';
import { Table } from '../../../models/table.ts';
import { MqttObjectUpdater } from '../../util/mqttObjectUpdater/mqttObjectUpdater';
import { BasicTerm } from '../../util/basicTerm';
import { MqttObjectUpdaterFactory } from '../../util/mqttObjectUpdater/mqttObjectUpdaterFactory';

export class GameEventMapper implements EventMapper<GameEventType> {
  private readonly _game: Game;
  private readonly _soccerTable: Table;
  private readonly _mqttObjectUpdaterGame: MqttObjectUpdater<Table>;

  constructor(soccerTable: Table) {
    this._soccerTable = soccerTable;
    this._game = soccerTable.game;
    this._mqttObjectUpdaterGame = MqttObjectUpdaterFactory.getMqttObjectUpdater(
      this._soccerTable,
      {
        prefix: BasicTerm.TABLE,
        instantPublish: true,
        publishWithRetain: true,
      },
    );
  }

  map(event: GameEventType) {
    const prevGame: Game = structuredClone(this._game);
    let triggeredEvents = [event];

    switch (event) {
      case GameEventType.WHITE_SCORE_CHANGE:
        break;
      case GameEventType.WHITE_SCORE_INCREASE:
        triggeredEvents.push(GameEventType.WHITE_SCORE_CHANGE);
        this._game.updateWhiteTeamScore(ScoreChange.INCREASE);
        break;
      case GameEventType.WHITE_SCORE_DECREASE:
        triggeredEvents.push(GameEventType.WHITE_SCORE_CHANGE);
        this._game.updateWhiteTeamScore(ScoreChange.DECREASE);
        break;
      case GameEventType.BLACK_SCORE_CHANGE:
        break;
      case GameEventType.BLACK_SCORE_INCREASE:
        triggeredEvents.push(GameEventType.BLACK_SCORE_CHANGE);
        this._game.updateBlackTeamScore(ScoreChange.INCREASE);
        break;
      case GameEventType.BLACK_SCORE_DECREASE:
        triggeredEvents.push(GameEventType.BLACK_SCORE_CHANGE);
        this._game.updateBlackTeamScore(ScoreChange.DECREASE);
        break;
      default:
        break;
    }

    triggeredEvents.concat(this._triggerScoreUpdates(event));

    if (prevGame?.teamWinner !== this._game?.teamWinner) {
      triggeredEvents.push(GameEventType.WINNER_CHANGE);
    }

    this.publishNewGameValues();
    return new Set(triggeredEvents);
  }

  private _triggerScoreUpdates(event: GameEventType) {
    const triggeredEvents: GameEventType[] = [];
    if (
      event.includes(GameEventType.SCORE_DECREASE) ||
      event.includes(GameEventType.SCORE_INCREASE)
    ) {
      triggeredEvents.push(GameEventType.SCORE_CHANGE);

      if (event.includes(TeamColor.WHITE)) {
        triggeredEvents.push(GameEventType.WHITE_SCORE_CHANGE);
      }
      if (event.includes(TeamColor.BLACK)) {
        triggeredEvents.push(GameEventType.BLACK_SCORE_CHANGE);
      }
    }
    return triggeredEvents;
  }

  private publishNewGameValues() {
    this._mqttObjectUpdaterGame.commit(this._soccerTable);
    this._mqttObjectUpdaterGame.publish();
  }
}
