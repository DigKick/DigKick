import type {EventMapper} from "../../global/eventMapper.ts";
import {NfcReaderEventType} from "./nfcReaderEvent.ts";
import type {NfcReaderPayload} from "../payloads/nfcReaderPayload.ts";
import type {TableHandler} from "../../table/handler/tableHandler.ts";
import {GameEventType} from "../../game/events/gameEvent.ts";
import {TeamColor} from "../../../models/team.ts";
import {PlayerEventType} from "../../player/events/playerEvent.ts";

export class NfcReaderEventMapper implements EventMapper<NfcReaderEventType> {

  private _tableHandler: TableHandler;
  private readonly _teamColor: TeamColor;

  private _registerEventMapper = {
    [TeamColor.BLACK]: PlayerEventType.PLAYER_REGISTER_BLACK_TEAM,
    [TeamColor.WHITE]: PlayerEventType.PLAYER_REGISTER_WHITE_TEAM
  }


  constructor(_tableHandler: TableHandler, teamColor: TeamColor) {
    this._tableHandler = _tableHandler;
    this._teamColor = teamColor;
  }

  map(event: NfcReaderEventType, topic: string, nfcReaderPayload: NfcReaderPayload) {
    const triggeredEvents = new Set([event])

    switch (event) {
      case NfcReaderEventType.READER_NFC_TAG_SERIAL_NUMBER:
        this._tableHandler.playerHandler.triggerEvent(this._registerEventMapper[this._teamColor], topic, nfcReaderPayload)
        this._tableHandler.gameHandler.triggerEvent(GameEventType.PLAYER_CHANGE, topic, {});
        break

      default:
        break
    }

    return triggeredEvents;
  };


}