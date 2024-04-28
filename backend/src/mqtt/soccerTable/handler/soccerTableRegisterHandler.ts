import {SoccerTable} from "../../../models/soccerTable";
import {BasicTerm} from "../../abstract/basicTerm";
import {DkMqttClient} from "../../client/client";
import type {TopicSubscriber} from "../../client/topicSubscriber";
import {SoccerTableHandler} from "./soccerTableHandler";
import {LoggerFactory} from "../../../logging/loggerFactory";

export enum SoccerTableRegisterTopic {
  REGISTER = `/${BasicTerm.TABLE}/register`,
}

export class SoccerTableRegisterHandler {

  private _logger = LoggerFactory.getLogger(SoccerTableRegisterHandler.name)

  private _dkMqttClient: DkMqttClient;

  soccerTableHandlers: Map<string, SoccerTableHandler> = new Map<
    string,
    SoccerTableHandler
  >();

  registerSubscriber: TopicSubscriber = {
    topic: SoccerTableRegisterTopic.REGISTER,
    func: (_: any, payload: Buffer) => {
      if (!payload) {
        return;
      }
      const soccerTableId = payload.toString();
      if (!this._validateTableId(soccerTableId)) {
        return;
      }

      if (!this.soccerTableHandlers.get(soccerTableId)) {
        this.soccerTableHandlers.set(
          soccerTableId,
          new SoccerTableHandler(new SoccerTable(soccerTableId)),
        );
        this._logger.info("New table registered: " + soccerTableId)
      } else {
        this._logger.warn("Table with id " + soccerTableId + " already registered.")
      }
    },
  };

  constructor() {
    this._dkMqttClient = DkMqttClient.getInstance();
    this._dkMqttClient.subscribeOnTopic(this.registerSubscriber);
  }

  private _validateTableId(tableId: string): boolean {
    return !(!tableId || tableId === "");
  }
}
