import { SoccerTable } from "../../../models/soccerTable";
import { BasicTerm } from "../../abstract/BasicTerm";
import { DkMqttClient } from "../../client/client";
import type { TopicSubscriber } from "../../client/topicSubscriber";
import { SoccerTableHandler } from "./soccerTableHandler";

export enum SoccerTableRegisterTopic {
  REGISTER = `/${BasicTerm.TABLE}/register`,
}

export class SoccerTableRegisterHandler {
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
