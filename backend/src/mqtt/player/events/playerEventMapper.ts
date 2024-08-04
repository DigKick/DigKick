import type { EventMapper } from '../../global/eventMapper.ts';
import { PlayerEventType } from './playerEvent.ts';
import { Table } from '../../../models/table.ts';
import type { NfcReaderPayload } from '../../hardware/payloads/nfcReaderPayload.ts';
import { PlayerRepository } from '../../../database/modules/player/playerRepository.ts';
import type { TableHandler } from '../../table/handler/tableHandler.ts';
import { GameEventType } from '../../game/events/gameEvent.ts';
import { PlayerDataPublisher } from '../publisher/playerDataPublisher.ts';

export class PlayerEventMapper implements EventMapper<PlayerEventType> {
  private readonly _tableHandler: TableHandler;

  constructor(tableHandler: TableHandler, table: Table) {
    this._tableHandler = tableHandler;
  }

  map(event: PlayerEventType, topic: string, payload: NfcReaderPayload) {
    switch (event) {
      case PlayerEventType.PLAYER_REGISTER_BLACK_TEAM:
        PlayerRepository.getOrCreatePlayer(payload.serialNumber).then(
          async (player) => {
            this._tableHandler.subject.game.teamBlack.addPlayer(player);
            this._tableHandler.gameHandler.triggerEvent(
              GameEventType.PLAYER_CHANGE,
              topic,
              payload,
            );
            this._tableHandler.playerEditHandlerBlack.lastPlayerAdded = player;
            await PlayerDataPublisher.publishAll();
          },
        );
        break;

      case PlayerEventType.PLAYER_REGISTER_WHITE_TEAM:
        PlayerRepository.getOrCreatePlayer(payload.serialNumber).then(
          async (player) => {
            this._tableHandler.subject.game.teamWhite.addPlayer(player);
            this._tableHandler.gameHandler.triggerEvent(
              GameEventType.PLAYER_CHANGE,
              topic,
              payload,
            );
            this._tableHandler.playerEditHandlerWhite.lastPlayerAdded = player;
            await PlayerDataPublisher.publishAll();
          },
        );

        break;
      case PlayerEventType.PLAYER_CHANGE_NAME:
        break;

      default:
        break;
    }

    return new Set([event]);
  }
}
