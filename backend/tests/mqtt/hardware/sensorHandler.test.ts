import { SensorHandler } from '../../../src/mqtt/hardware/handler/sensorHandler.ts';
import { Table } from '../../../src/models/table.ts';
import { TableHandler } from '../../../src/mqtt/table/handler/tableHandler.ts';
import { TeamColor } from '../../../src/models/team.ts';
import { expect, test } from 'bun:test';
import { BasicTerm } from '../../../src/mqtt/util/basicTerm.ts';
import { PinOut } from '../../../src/mqtt/hardware/payloads/pinStatusPayload.ts';

const hardwareHandler = new SensorHandler(
  new TableHandler(new Table('table')),
  TeamColor.WHITE,
);

test('test valid button mappings', () => {
  for (let i = 0; i < 3; i++) {
    expect(() =>
      hardwareHandler.mapTypeAndIdToEvent(BasicTerm.BUTTON, i, PinOut.HIGH),
    ).not.toThrowError();
    expect(() =>
      hardwareHandler.mapTypeAndIdToEvent(BasicTerm.BUTTON, i, PinOut.LOW),
    ).not.toThrowError();
  }
});

test('test valid lightbarrier mappings', () => {
  for (let i = 0; i < 2; i++) {
    expect(() =>
      hardwareHandler.mapTypeAndIdToEvent(
        BasicTerm.LIGHT_BARRIER,
        i,
        PinOut.HIGH,
      ),
    ).not.toThrowError();
    expect(() =>
      hardwareHandler.mapTypeAndIdToEvent(
        BasicTerm.LIGHT_BARRIER,
        i,
        PinOut.LOW,
      ),
    ).not.toThrowError();
  }
});
