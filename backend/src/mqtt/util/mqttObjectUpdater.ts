import {DkMqttClient} from "../client/client";

export class ChangeLog {
  constructor(public oldValue: any, public newValue: any) {}

  public toString = (): string => {
    return `oldValue: ${ this.oldValue }, newValue: ${ this.newValue }`;
  }
}

export interface MqttObjectUpdaterConfig {
  prefix?: string,
  instantPublish?: boolean,
  publishWithRetain?: boolean
}

export class MqttObjectUpdater<ObjectType> {
  subject: ObjectType
  latestChanges: Map<String, ChangeLog>
  config: MqttObjectUpdaterConfig

  constructor(subject: ObjectType, config?: MqttObjectUpdaterConfig) {
    this.subject = structuredClone(subject);
    this.config = {prefix: "", instantPublish: false, publishWithRetain: false, ...config};
    this.latestChanges = new Map<string, ChangeLog>();

    console.log(this.config)

    if (this.config.instantPublish) {
      console.log("instant")
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
        ...MqttObjectUpdater.compareObjects(this.subject, updatedSubject, this.config.prefix).entries()])
    this.subject = structuredClone(updatedSubject)
  }

  /**
   * Publishes the changes to the mqtt broker.
   */
  publish() {
    const dkMqttClient = DkMqttClient.getInstance()
    Array.from(this.latestChanges.entries()).forEach(entry => {
      if (this.config.publishWithRetain) {
        console.log("updater path", String(entry[0]))
        dkMqttClient.publishWithRetain(String(entry[0]), JSON.stringify(entry[1].newValue))
      } else {
        dkMqttClient.publish(String(entry[0]), JSON.stringify(entry[1].newValue))
      }
    })
    this.latestChanges.clear()
  }

  private static generateInitialChangeMap(obj: any, path: string): Map<string, ChangeLog> {
    return MqttObjectUpdater.compareObjects(obj, {}, path)
  }

  private static compareObjects(obj1: any, obj2: any, path: string = '', changes?: Map<string, ChangeLog>, visited: Set<any> = new Set(), maxDepth: number = 5): Map<string, ChangeLog> {
    if (!changes) {
      changes = new Map()
    }

    if (visited.has(obj1) || visited.has(obj2) || maxDepth < 0) {
      return changes;
    }

    visited.add(obj1);
    visited.add(obj2);

    const keys = Reflect.ownKeys(obj1);
    let maybeId = ""

    if (keys.includes("id")) {
      maybeId = obj1["id"];
    }

    keys.forEach(key => {
      let newPath = ""
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (value1 !== value2) {
        if (value1 && typeof value1 === 'object' && value2 && typeof value2 === 'object' && !Array.isArray(value1) && !Array.isArray(value2)) {
          newPath = MqttObjectUpdater.makeNewPath(newPath, path, maybeId, key);
          this.compareObjects(value1, value2, newPath, changes, visited, maxDepth-1);
        } else {
          changes.set(path + `/${String(key)}`.replace("_", ""), new ChangeLog(value1, value2));
        }
      }
    });

    return changes
  }

  private static makeNewPath(newPath: string, path: string, maybeId: string, key: string | symbol) {
    newPath = path + (maybeId === "" ? "" : "/" + maybeId) + String("/" + String(key))
    return newPath.replace(/[A-Z]/g, (match) => '/' + match.toLowerCase()).replaceAll("_", "");
  }
}