import {DkModelHandler, HandlerType} from "../../global/dkModelHandler.ts";
import type {NfcReaderEventType} from "../events/nfcReaderEvent.ts";
import type {TeamColor} from "../../../models/team.ts";
import type {Table} from "../../../models/table.ts";

export class NfcReaderHandler extends DkModelHandler<NfcReaderEventType, NfcReaderHandler> {

  private _topicToEventRouter = (topic: string, payload: any) => {
    return
  }

  constructor(subject: NfcReaderHandler, teamColor: TeamColor, table: Table) {
    super(subject, HandlerType.HARDWARE, table);
  }

}