import {Table} from "../../../models/table.ts";
import {BasicTerm} from "../../util/basicTerm";
import {DkMqttClient} from "../../client/client";
import type {TopicSubscriber} from "../../client/topicSubscriber";
import {TableHandler} from "./tableHandler.ts";
import {LoggerFactory} from "../../../logging/loggerFactory";
import {Logger} from "winston";
import type {TableRegisterPayload} from "../payloads/tableRegisterPayload";
import {RegisteredTableListPayload} from "../payloads/registeredTableListPayload";
import {TableRepository} from "../../../database/modules/table/tableRepository.ts";

export enum SoccerTableRegisterTopic {
  REGISTER = `/${BasicTerm.TABLE}/register`,
}

export class TableRegisterHandler {
  private _logger: Logger = LoggerFactory.getLogger(
    TableRegisterHandler.name,
  );

  private _dkMqttClient: DkMqttClient;

  public static tableHandlers: Map<string, TableHandler> = new Map<
    string,
    TableHandler
  >();

  registerSubscriber: TopicSubscriber = {
    topic: SoccerTableRegisterTopic.REGISTER,
    func: (_: any, payload: TableRegisterPayload) => {
      if (!this._checkIfTableRegisterPayloadIsValid(payload)) {
        this._logger.warn("Table register payload invalid.");
        return;
      }

      const tableName = payload.name.toLowerCase();

      if (!this._validateTableName(tableName)) {
        this._logger.error(
          `"${tableName}" is not a valid name for a table.`,
        );
        return;
      }

      this._registerTable(tableName);
    },
  };

  private _checkIfTableRegisterPayloadIsValid(payload: TableRegisterPayload) {
    return payload && payload.name;
  }

  private _registerTable(tableName: string) {
    const table = new Table(tableName)

    if (!TableRegisterHandler.tableHandlers.get(tableName)) {
      TableRegisterHandler.tableHandlers.set(
        tableName,
        new TableHandler(new Table(tableName)),
      );
      this._dkMqttClient.publishWithRetain(
        "/tables",
        JSON.stringify(
          new RegisteredTableListPayload(
            Array.from(TableRegisterHandler.tableHandlers.keys()),
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
  }

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
