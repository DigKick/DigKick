import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import {PlayerEditEvent} from "../events/playerEditEvent.ts";
import type {Table} from "../../../models/table.ts";
import type {TopicSubscriber} from "../../client/topicSubscriber.ts";
import type {TeamColor} from "../../../models/team.ts";
import {PlayerTopicManager} from "../topics/playerTopicManager.ts";
import type {PlayerNameEditPayload} from "../payloads/playerNameEditPayload.ts";
import {PlayerEditEventMapper} from "../events/playerEditEventMapper.ts";
import type {TableHandler} from "../../table/handler/tableHandler.ts";
import type {Player} from "../../../models/player.ts";
import {ApplicationProperties} from "../../../util/properties/applicationProperties.ts";

export class PlayerEditHandler extends DkModelHandler<PlayerEditEvent, Table> {

  lastPlayerAdded?: Player

  playerEditorSubscriber: TopicSubscriber

  constructor(private _tableHandler: TableHandler, private _teamColor: TeamColor) {
    super(_tableHandler.subject, HandlerType.PLAYER_EDITOR, _tableHandler.subject);
    this._mapper = new PlayerEditEventMapper(this)

    this.playerEditorSubscriber = {
      topic: new PlayerTopicManager(_tableHandler.subject, _teamColor).nfcReaderTopic(),
      func: this.editorSubscriberFunc
    }

    this._dkMqttClient.subscribeOnTopic(this.playerEditorSubscriber)
  }

  get tableHandler() {
    return this._tableHandler;
  }

  editorSubscriberFunc = (topic: string, payload: any) => {
    let playerNameEditPayload: PlayerNameEditPayload
    try {
      playerNameEditPayload = payload as PlayerNameEditPayload
    } catch (e) {
      this._logger.warn("Could not parse payload to PlayerNameEditPayload: ", e)
      return
    }

    if (!this.isPlayerNameLengthValid(playerNameEditPayload.newName)) {
      this._logger.error("Could not set new player name. Invalid player name: "
        + playerNameEditPayload.newName + `\t(Player name must be between 
        ${ApplicationProperties.get().player.name.restrictions.min} and 
        ${ApplicationProperties.get().player.name.restrictions.max} characters long!)`)
      return;
    }

    this.triggerEvent(PlayerEditEvent.EDIT_NAME, topic, playerNameEditPayload)
  }

  isPlayerNameLengthValid(playerName: string): boolean {
    return !(playerName.length < ApplicationProperties.get().player.name.restrictions.length.min
      || playerName.length > ApplicationProperties.get().player.name.restrictions.length.max);
  }

}