import { SoccerTable } from "../../../../models/soccerTable";
import { DkMqttClient } from "../../../client/client";
import type { TopicSubscriber } from "../../../client/topicSubscriber";
import { SoccerTableHandler } from "../../handler/soccerTableHandler";

export class SoccerTableRegisterHandler {
  dkMqttClient: DkMqttClient;

  soccerTableHandlers: Array<SoccerTableHandler> =
    new Array<SoccerTableHandler>();

  registerSubscriber: TopicSubscriber = {
    topic: "/register/table",
    func: (_: any, payload: Buffer) => {
      const soccerTableId = payload.toString();
      if (!this._validateTableId(soccerTableId)) {
        return;
      }
      this.soccerTableHandlers.push(
        new SoccerTableHandler(new SoccerTable(soccerTableId))
      );
    },
  };

  constructor() {
    this.dkMqttClient = DkMqttClient.getInstance();
    this.dkMqttClient.subscribeOnTopic(this.registerSubscriber);
  }

  private _validateTableId(tableId: string): boolean {
    return !(!tableId || tableId === "");
  }
}
