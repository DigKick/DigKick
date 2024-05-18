import {test} from "bun:test";
import {MqttObjectUpdater} from "../../../mqtt/util/mqttObjectUpdater/mqttObjectUpdater";
import {SoccerTable} from "../../../models/soccerTable";
import {BasicTerm} from "../../../mqtt/util/basicTerm";


test('compare function table', () => {
  let table = new SoccerTable("test")
  let updater = new MqttObjectUpdater<SoccerTable>(table, {prefix: `/${BasicTerm.TABLE}`, instantPublish: true, publishWithRetain: true} )

  table.game.teamBlack.score = 10;

  table.game.teamWhite.score = 5;

  updater.commit(table)
  updater.publish()
})

test('compare init table', () => {
  let table = new SoccerTable("test")
  let updater = new MqttObjectUpdater<SoccerTable>(table, {prefix: `/${BasicTerm.TABLE}`, instantPublish: true, publishWithRetain: true} )

  Array.from(updater.latestChanges.entries()).forEach(entry => {
    console.log(`Changed: ${entry[0]}: ${entry[1]}`);
  })
})