import {expect, test} from "bun:test";
import {MqttObjectUpdater} from "../../../../src/mqtt/util/mqttObjectUpdater/mqttObjectUpdater.ts";
import {Table} from "../../../../src/models/table.ts";
import {BasicTerm} from "../../../../src/mqtt/util/basicTerm.ts";

test("compare function table", () => {
  let table = new Table("test");
  let updater = new MqttObjectUpdater<Table>(table, {
    prefix: `/${BasicTerm.TABLE}`,
    instantPublish: true,
    publishWithRetain: true,
  });

  table.game.teamWhite.score = 5;

  updater.commit(table);
  expect(updater.latestChanges.size).toEqual(3); // update: game itself, teamWhite, teamWhiteScore
  updater.publish();
});

test("compare init table", () => {
  let table = new Table("test");
  let updater = new MqttObjectUpdater<Table>(table, {
    prefix: `/${BasicTerm.TABLE}`,
    instantPublish: true,
    publishWithRetain: true,
  });

  expect(updater.latestChanges.size).toEqual(0);
});
