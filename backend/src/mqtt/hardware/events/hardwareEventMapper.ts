import type {EventMapper} from "../../abstract/eventMapper";
import {HardwareEventType} from "./hardwareEvent";
import {SoccerTableHandler} from "../../soccerTable/handler/soccerTableHandler";
import {TeamColor} from "../../../models/team";

export class HardwareEventMapper implements EventMapper<HardwareEventType>{

  soccerTableHandler: SoccerTableHandler;

  constructor(soccerTableHandler: SoccerTableHandler, teamColor: TeamColor) {
    this.soccerTableHandler = soccerTableHandler;

  }

  map(event: HardwareEventType) {
    const triggeredEvents = new Set<HardwareEventType>([event]);
    console.log(`Hardware event triggered: ${event}`)
    return triggeredEvents;
  }
}

