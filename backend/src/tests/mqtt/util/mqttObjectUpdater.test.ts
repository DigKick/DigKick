import {expect, test} from "bun:test";
import {MqttObjectUpdater} from "../../../mqtt/util/mqttObjectUpdater/mqttObjectUpdater";
import {Table} from "../../../models/table.ts";
import {BasicTerm} from "../../../mqtt/util/basicTerm";

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
