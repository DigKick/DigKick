import {Table} from "../../../models/table.ts";
import {BasicTerm} from "../../util/basicTerm";
import {DkMqttClient} from "../../client/client";
import type {TopicSubscriber} from "../../client/topicSubscriber";
import {SoccerTableHandler} from "./soccerTableHandler";
import {LoggerFactory} from "../../../logging/loggerFactory";
import {Logger} from "winston";
import type {TableRegisterPayload} from "../payloads/tableRegisterPayload";
import {RegisteredTableListPayload} from "../payloads/registeredTableListPayload";
import {TableRepository} from "../../../database/modules/table/tableRepository.ts";

export enum SoccerTableRegisterTopic {
  REGISTER = `/${BasicTerm.TABLE}/register`,
}

export class SoccerTableRegisterHandler {
  private _logger: Logger = LoggerFactory.getLogger(
    SoccerTableRegisterHandler.name,
  );

  private _dkMqttClient: DkMqttClient;

  public static tableHandlers: Map<string, SoccerTableHandler> = new Map<
    string,
    SoccerTableHandler
  >();

  registerSubscriber: TopicSubscriber = {
    topic: SoccerTableRegisterTopic.REGISTER,
    func: (_: any, payload: TableRegisterPayload) => {
      if (!payload || !payload.name) {
        this._logger.error("Table register payload invalid.");
        return;
      }
      const tableName = payload.name.toLowerCase();
      if (!this._validateTableName(tableName)) {
        this._logger.error(
          `"${tableName}" is not a valid id for a soccer table.`,
        );
        return;
      }

      const table = new Table(tableName)

      if (!SoccerTableRegisterHandler.tableHandlers.get(tableName)) {
        SoccerTableRegisterHandler.tableHandlers.set(
          tableName,
          new SoccerTableHandler(new Table(tableName)),
        );
        this._dkMqttClient.publishWithRetain(
          "/tables",
          JSON.stringify(
            new RegisteredTableListPayload(
              Array.from(SoccerTableRegisterHandler.tableHandlers.keys()),
            ),
          ),
        );
        this._logger.info("New table registered: " + tableName);

        TableRepository.saveTable(table).then()
      } else {
        this._logger.warn(
          "Table with id " + tableName + " already registered.",
        );
      }
    },
  };

  constructor() {
    this._dkMqttClient = DkMqttClient.getInstance();
    this._dkMqttClient.subscribeOnTopic(this.registerSubscriber);
  }

  private _validateTableName(tableId: string): boolean {
    if (tableId != tableId.toLowerCase()) {
      return false;
    }
    if (tableId == "register") {
      return false;
    }
    return !(!tableId || tableId === "");
  }
}
