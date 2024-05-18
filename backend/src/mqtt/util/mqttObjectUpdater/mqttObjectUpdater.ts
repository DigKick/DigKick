import {DkMqttClient} from "../../client/client";
import {ChangeLog} from "./changeLog";
import type {MqttObjectUpdaterConfig} from "./mqttObjectUpdaterConfig";


export class MqttObjectUpdater<ObjectType> {
  subject: ObjectType
  latestChanges: Map<String, ChangeLog>
  config: MqttObjectUpdaterConfig

  constructor(subject: ObjectType, config?: MqttObjectUpdaterConfig) {
    this.subject = structuredClone(subject);
    this.config = {prefix: "", instantPublish: false, publishWithRetain: false, maxDepth: -1, ...config};
    this.latestChanges = new Map<string, ChangeLog>();

    if (this.config.instantPublish) {
      this.latestChanges = MqttObjectUpdater.generateInitialChangeMap(this.subject, this.config.prefix!)
      this.publish()
    }
  }

  /**
   * Updates the subject
   *
   * @param updatedSubject
   */
  commit(updatedSubject: ObjectType) {
    this.latestChanges = new Map(
      [...this.latestChanges.entries(),
        ...MqttObjectUpdater.compareObjects(this.subject, updatedSubject, this.config.prefix, this.config.maxDepth).entries()])
    this.subject = structuredClone(updatedSubject)
  }

  /**
   * Publishes the changes to the mqtt broker.
   */
  publish() {
    console.log("---------------------------PUBLISH CALLED")
    console.log("publishing changes:")
    Array.from(this.latestChanges.entries()).forEach((change) => {
      console.log("change: ", change)
    })

    const dkMqttClient = DkMqttClient.getInstance()
    Array.from(this.latestChanges.entries()).forEach(entry => {
      if (!entry || !entry[0] || !entry[1]) return
      const publishString = JSON.stringify(entry[1].newValue).replaceAll("_", "")
      if (!publishString) return;
      if (this.config.instantPublish) {
        dkMqttClient.publishWithRetain(String(entry[0]), publishString)
      } else {
        dkMqttClient.publish(String(entry[0]), publishString)
      }
      console.log("publish: ", publishString)
    })
    this.latestChanges.clear()
  }

  private static generateInitialChangeMap(obj: any, path: string): Map<string, ChangeLog> {
    return MqttObjectUpdater.compareObjects({}, obj, path)
  }


  private static compareObjects(oldObj: any, newObj: any, path: string = '', maxDepth: number = 1, visited: Set<any> = new Set(), ): Map<string, ChangeLog> {
    let changes = new Map<string, ChangeLog>();

    if (visited.has(oldObj) || visited.has(newObj) || maxDepth === 0) {
      return changes;
    }

    visited.add(oldObj);
    visited.add(newObj);

    const keys = new Set([...Reflect.ownKeys(oldObj), ...Reflect.ownKeys(newObj)]);
    let localPath = structuredClone(path)

    if (keys.has("id")) {
      localPath += "/" + newObj["id"]
    }

    keys.forEach((key) => {
      if (!changes) {
        changes = new Map()
      }
      const oldVal = oldObj[key]
      const newVal = newObj[key]

      if (oldVal !== newVal) {


        if (typeof oldVal ==="object" && typeof newVal ==="object" ) {
          changes = new Map([...changes.entries(), ...MqttObjectUpdater.compareObjects(oldVal, newVal, this.makeNewPath(localPath, key), maxDepth - 1, visited).entries()])
        } else {
        }
        changes.set(this.makeNewPath(localPath, key), new ChangeLog(oldVal, newVal))

      }
    })

    return changes
  }

  private static makeNewPath(path: string, key: string | symbol) {
    let newPath = path + String("/" + String(key)).replace(/[A-Z]/g, (match) => '/' + match.toLowerCase()).replaceAll("_", "")
    console.log("new path: ", newPath)
    return newPath;
  }
}