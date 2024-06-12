import type {EventMapper} from "../../global/eventMapper.ts";
import {type NfcReaderEventType} from "./nfcReaderEvent.ts";
import {type PlayerHandler} from "../../player/handler/playerHandler.ts";

export class NfcReaderEventMapper implements EventMapper<NfcReaderEventType> {

  private _playerHandler: PlayerHandler;


  constructor(playerHandler: PlayerHandler) {
    this._playerHandler = playerHandler;
  }

  map(event: NfcReaderEventType, topic: string | undefined, payload: any) {
    return new Set([event]);
  };

}