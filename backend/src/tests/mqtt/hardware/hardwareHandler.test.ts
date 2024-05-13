import {HardwareHandler} from "../../../mqtt/hardware/handler/hardwareHandler";
import {SoccerTable} from "../../../models/soccerTable";
import {SoccerTableHandler} from "../../../mqtt/soccerTable/handler/soccerTableHandler";
import {TeamColor} from "../../../models/team";
import {expect, test} from "bun:test";
import {BasicTerm} from "../../../mqtt/util/basicTerm";
import {PinOut} from "../../../mqtt/client/payloads/pinStatusPayload";

const hardwareHandler = new HardwareHandler(
  new SoccerTableHandler(new SoccerTable("table")),
  TeamColor.WHITE);


test('test valid button mappings', () => {
  for (let i = 0; i < 3; i++) {
    expect(() => hardwareHandler.mapTypeAndIdToEvent(BasicTerm.BUTTON, i, PinOut.HIGH)).not.toThrowError()
    expect(() => hardwareHandler.mapTypeAndIdToEvent(BasicTerm.BUTTON, i, PinOut.LOW)).not.toThrowError()
  }
})

test('test valid lightbarrier mappings', () => {
  for (let i = 0; i < 2; i++) {
    expect(() => hardwareHandler.mapTypeAndIdToEvent(BasicTerm.LIGHTBARRIER, i, PinOut.HIGH)).not.toThrowError()
    expect(() => hardwareHandler.mapTypeAndIdToEvent(BasicTerm.LIGHTBARRIER, i, PinOut.LOW)).not.toThrowError()
  }
})