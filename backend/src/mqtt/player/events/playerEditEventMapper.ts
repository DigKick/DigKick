import type { EventMapper } from '../../global/eventMapper.ts';
import { PlayerEditEvent } from './playerEditEvent.ts';
import type { PlayerEditHandler } from '../handler/playerEditHandler.ts';
import type { PlayerNameEditPayload } from '../payloads/playerNameEditPayload.ts';
import { PlayerRepository } from '../../../database/modules/player/playerRepository.ts';
import { PlayerDataPublisher } from '../publisher/playerDataPublisher.ts';
import { GameEventType } from '../../game/events/gameEvent.ts';
import { TopicTool } from '../../util/topicTool.ts';
import { TeamColor } from '../../../models/team.ts';
import { LoggerFactory } from '../../../logging/loggerFactory.ts';

export class PlayerEditEventMapper implements EventMapper<PlayerEditEvent> {
  logger = LoggerFactory.getLogger(PlayerEditEventMapper.name);

  constructor(private _playerEditHandler: PlayerEditHandler) {}

  map(event: PlayerEditEvent, topic: string, payload: PlayerNameEditPayload) {
    switch (event) {
      case PlayerEditEvent.EDIT_NAME:
        if (!this._playerEditHandler.lastPlayerAdded) break;
        const playerToBeChanged = this._playerEditHandler.lastPlayerAdded;
        const topicTool = new TopicTool(topic);
        const teamColor = topicTool.getSegment(4).toLowerCase();

        this._playerEditHandler.lastPlayerAdded = undefined;

        PlayerRepository.updatePlayerName(
          playerToBeChanged,
          payload.newName,
        ).then(async () => {
          await PlayerDataPublisher.publishAll();
        });

        const game = this._playerEditHandler.tableHandler.subject.game;

        switch (teamColor) {
          case TeamColor.WHITE:
            if (game.teamWhite.playerOne) {
              game.teamWhite.playerOne.name = payload.newName;
            }
            break;
          case TeamColor.BLACK:
            if (game.teamBlack.playerOne) {
              game.teamBlack.playerOne.name = payload.newName;
            }
            break;
          default:
            this.logger.error('Invalid team color: ', teamColor);
        }

        this._playerEditHandler.tableHandler.gameHandler.triggerEvent(
          GameEventType.PLAYER_CHANGE,
          topic,
          payload,
        );
        break;
      default:
        break;
    }

    return new Set<PlayerEditEvent>([event]);
  }
}
