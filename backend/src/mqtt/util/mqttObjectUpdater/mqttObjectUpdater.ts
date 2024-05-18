import {DkMqttClient} from "../../client/client";
import {ChangeLog} from "./changeLog";
import type {MqttObjectUpdaterConfig} from "./mqttObjectUpdaterConfig";

/**
 * if someone wants to change something here - may the force be with you
 */
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


  commit(updatedSubject: ObjectType) {
    this.latestChanges = new Map(
      [...this.latestChanges.entries(),
        ...MqttObjectUpdater.compareObjects(this.subject, updatedSubject, this.config.prefix).entries()])
    this.subject = structuredClone(updatedSubject)
  }

  publish() {
    const dkMqttClient = DkMqttClient.getInstance()
    Array.from(this.latestChanges.entries()).forEach(entry => {
      if (!entry || !entry[0] || !entry[1]) return
      let publishString = " "
      if (entry[1].newValue !== undefined) {
        publishString = JSON.stringify(entry[1].newValue).replaceAll("_", "")
      }

      const publishTopic = String(entry[0] + (publishString.startsWith("{") || publishString === " " ? "" : "$"))

      if (!publishString) {
        return
      }
      if (this.config.instantPublish) {
        dkMqttClient.publishWithRetain(publishTopic, publishString)
      } else {
        dkMqttClient.publish(publishTopic, publishString)
      }
    })
    this.latestChanges.clear()
  }

  private static generateInitialChangeMap(obj: any, path: string): Map<string, ChangeLog> {
    return MqttObjectUpdater.compareObjects({}, obj, path)
  }


  private static compareObjects(oldObj: any, newObj: any, path: string = '', visited: Set<any> = new Set()): Map<string, ChangeLog> {
    let changes = new Map<string, ChangeLog>();

    if (visited.has(oldObj) || visited.has(newObj)) {
      return changes;
    }

    visited.add(oldObj);
    visited.add(newObj);

    const keys = Object.keys(newObj);
    let localPath = structuredClone(path);

    if (keys.includes("id")) {
      localPath += "/" + newObj["id"];
    }

    keys.forEach((key) => {

      if (!oldObj && !newObj) return;

      if (!oldObj || !newObj) {

        if (oldObj) {
          changes.set(this.makeNewPath(localPath, key), new ChangeLog(oldObj[key], undefined));
        } else {
          changes.set(this.makeNewPath(localPath, key), new ChangeLog(undefined, newObj[key]));
        }

        return
      }

      const oldVal = oldObj[key];
      const newVal = newObj[key];

      if (oldVal !== newVal) {
        if (typeof newVal === 'object') {
          const objChanges = MqttObjectUpdater.compareObjects(oldVal, newVal, localPath)
          if (objChanges.size > 0) {
            changes.set(this.makeNewPath(localPath, key), new ChangeLog(oldVal, newVal));
          }
        } else {
          changes.set(this.makeNewPath(localPath, key), new ChangeLog(oldVal, newVal));
        }
      }
    });

    return changes;
  }

  private static makeNewPath(path: string, key: string | symbol) {
    return path + String("/" + String(key)).replace(/[A-Z]/g, (match) => '/' + match.toLowerCase()).replaceAll("_", "");
  }
}