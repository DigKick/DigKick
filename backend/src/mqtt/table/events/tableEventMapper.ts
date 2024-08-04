import type { EventMapper } from '../../global/eventMapper';
import { TableEventType } from './tableEventType.ts';
import { Table } from '../../../models/table.ts';
import { GameHandler } from '../../game/handler/gameHandler';
import { GameEventType } from '../../game/events/gameEvent';
import { GameRepository } from '../../../database/modules/game/gameRepository.ts';
import { PlayerRepository } from '../../../database/modules/player/playerRepository.ts';
import { PlayerDataPublisher } from '../../player/publisher/playerDataPublisher.ts';

export class TableEventMapper implements EventMapper<TableEventType> {
  private _gameHandler: GameHandler;
  private readonly _table: Table;

  constructor(soccerTable: Table, gameHandler: GameHandler) {
    this._table = soccerTable;
    this._gameHandler = gameHandler;
  }

  map(event: TableEventType, topic: string, payload: any) {
    let triggeredEvents = [event];

    switch (event) {
      case TableEventType.NEW_GAME:
        this._table.newGame();
        this._gameHandler.triggerEvent(
          GameEventType.WHITE_SCORE_CHANGE,
          topic,
          payload,
        );
        this._gameHandler.triggerEvent(
          GameEventType.BLACK_SCORE_CHANGE,
          topic,
          payload,
        );
        break;

      case TableEventType.FINISH_GAME:
        GameRepository.saveGame(this._table.game, this._table).then(() => {
          PlayerRepository.updatePlayerEloInGame(this._table.game).then(
            async () => {
              this._table.newGame();
              this._gameHandler.triggerEvent(
                GameEventType.WHITE_SCORE_CHANGE,
                topic,
                payload,
              );
              this._gameHandler.triggerEvent(
                GameEventType.BLACK_SCORE_CHANGE,
                topic,
                payload,
              );

              await PlayerDataPublisher.publishAll();
            },
          );
        });
        break;

      case TableEventType.CANCEL_GAME:
        this._table.newGame();
        this._gameHandler.triggerEvent(
          GameEventType.WHITE_SCORE_CHANGE,
          topic,
          payload,
        );
        this._gameHandler.triggerEvent(
          GameEventType.BLACK_SCORE_CHANGE,
          topic,
          payload,
        );
        break;

      default:
        break;
    }

    if (event.includes(TableEventType.GAME)) {
      triggeredEvents.push(TableEventType.NEW_GAME);
    }

    return new Set(triggeredEvents);
  }
}
