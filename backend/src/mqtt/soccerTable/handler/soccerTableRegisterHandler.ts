import {SoccerTable} from "../../../models/soccerTable";
import {BasicTerm} from "../../abstract/basicTerm";
import {DkMqttClient} from "../../client/client";
import type {TopicSubscriber} from "../../client/topicSubscriber";
import {SoccerTableHandler} from "./soccerTableHandler";
import {LoggerFactory} from "../../../logging/loggerFactory";
import {Logger} from "winston";
import type {TableRegisterPayload} from "../../client/payloads/tableRegisterPayload";

export enum SoccerTableRegisterTopic {
  REGISTER = `/${BasicTerm.TABLE}/register`,
}

export class SoccerTableRegisterHandler {

  private _logger: Logger = LoggerFactory.getLogger(SoccerTableRegisterHandler.name)

  private _dkMqttClient: DkMqttClient;

  public static soccerTableHandlers: Map<string, SoccerTableHandler> = new Map<
    string,
    SoccerTableHandler
  >();

  registerSubscriber: TopicSubscriber = {
    topic: SoccerTableRegisterTopic.REGISTER,
    func: (_: any, payload: TableRegisterPayload) => {
      if (!payload) {
        return;
      }
      const soccerTableId = payload.tableId;
      if (!this._validateTableId(soccerTableId)) {
        this._logger.error(`"${soccerTableId}" is not a valid id for a soccer table.`)
        return;
      }

      if (!SoccerTableRegisterHandler.soccerTableHandlers.get(soccerTableId)) {
        SoccerTableRegisterHandler.soccerTableHandlers.set(
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
