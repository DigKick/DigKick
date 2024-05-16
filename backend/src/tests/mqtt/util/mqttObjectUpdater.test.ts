import {test} from "bun:test";
import {MqttObjectUpdater} from "../../../mqtt/util/mqttObjectUpdater";
import {SoccerTable} from "../../../models/soccerTable";


test('compare function table', () => {
  let table = new SoccerTable("test")
  let updater = new MqttObjectUpdater<SoccerTable>(table, {prefix: "/table", instantPublish: true, publishWithRetain: true})

  table.game.teamBlack.score = 10;

  table.game.teamWhite.score = 5;

  updater.commit(table)

  Array.from(updater.latestChanges.entries()).forEach(entry => {
    console.log(`Changed: ${entry[0]}: ${entry[1]}`);
  })
})