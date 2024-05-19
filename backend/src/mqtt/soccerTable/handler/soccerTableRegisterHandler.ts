import { SoccerTable } from "../../../models/soccerTable";
import { BasicTerm } from "../../util/basicTerm";
import { DkMqttClient } from "../../client/client";
import type { TopicSubscriber } from "../../client/topicSubscriber";
import { SoccerTableHandler } from "./soccerTableHandler";
import { LoggerFactory } from "../../../logging/loggerFactory";
import { Logger } from "winston";
import type { TableRegisterPayload } from "../payloads/tableRegisterPayload";
import { RegisteredTableListPayload } from "../payloads/registeredTableListPayload";

export enum SoccerTableRegisterTopic {
  REGISTER = `/${BasicTerm.TABLE}/register`,
}

export class SoccerTableRegisterHandler {
  private _logger: Logger = LoggerFactory.getLogger(
    SoccerTableRegisterHandler.name,
  );

  private _dkMqttClient: DkMqttClient;

  public static soccerTableHandlers: Map<string, SoccerTableHandler> = new Map<
    string,
    SoccerTableHandler
  >();

  registerSubscriber: TopicSubscriber = {
    topic: SoccerTableRegisterTopic.REGISTER,
    func: (_: any, payload: TableRegisterPayload) => {
      if (!payload || !payload.id) {
        this._logger.error("Table register payload invalid.");
        return;
      }
      const soccerTableId = payload.id.toLowerCase();
      if (!this._validateTableId(soccerTableId)) {
        this._logger.error(
          `"${soccerTableId}" is not a valid id for a soccer table.`,
        );
        return;
      }

      if (!SoccerTableRegisterHandler.soccerTableHandlers.get(soccerTableId)) {
        SoccerTableRegisterHandler.soccerTableHandlers.set(
          soccerTableId,
          new SoccerTableHandler(new SoccerTable(soccerTableId)),
        );
        this._dkMqttClient.publishWithRetain(
          "/tables",
          JSON.stringify(
            new RegisteredTableListPayload(
              Array.from(SoccerTableRegisterHandler.soccerTableHandlers.keys()),
            ),
          ),
        );
        this._logger.info("New table registered: " + soccerTableId);
      } else {
        this._logger.warn(
          "Table with id " + soccerTableId + " already registered.",
        );
      }
    },
  };

  constructor() {
    this._dkMqttClient = DkMqttClient.getInstance();
    this._dkMqttClient.subscribeOnTopic(this.registerSubscriber);
  }

  private _validateTableId(tableId: string): boolean {
    if (tableId != tableId.toLowerCase()) {
      return false;
    }
    if (tableId == "register") {
      return false;
    }
    return !(!tableId || tableId === "");
  }
}
