import type {EventMapper} from "../../global/eventMapper.ts";
import {NfcReaderEventType} from "./nfcReaderEvent.ts";
import {type PlayerHandler} from "../../player/handler/playerHandler.ts";
import {PlayerEventType} from "../../player/events/playerEvent.ts";
import {TopicTool} from "../../util/topicTool.ts";

export class NfcReaderEventMapper implements EventMapper<NfcReaderEventType> {

  private _playerHandler: PlayerHandler;


  constructor(playerHandler: PlayerHandler) {
    this._playerHandler = playerHandler;
  }

  map(event: NfcReaderEventType, topic: string, payload: any) {
    const triggeredEvents = new Set([event])

    const topicTool = new TopicTool(topic)


    switch (event) {
      case NfcReaderEventType.LOGIN_PLAYER:
        this._playerHandler.triggerEvent(PlayerEventType.BLACK_PLAYER_REGISTER_TO_GAME, topic, payload);
        break
    }

    return triggeredEvents;
  };

}