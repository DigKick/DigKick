import YAML from "yaml";
import fs from "node:fs";
import * as path from 'path';

export interface ApplicationProperties {

  digkick: {
    banner: boolean | undefined
  } | undefined

  mqtt: {
    login: {
      username: string | undefined,
      password: string | undefined
    } | undefined
    host: string | undefined
  } | undefined

  db: {
    file: {
      name: string | undefined,
      suffix: string | undefined
    } | undefined
  } | undefined

  playerNameRestrictions: {
    length: {
      min: number | undefined,
      max: number | undefined
    } | undefined
    forbiddenParts: Array<string> | undefined
  } | undefined
}

const defaultProperties: ApplicationProperties = {

  digkick: {
    banner: true,
  },

  mqtt: {
    login: {
      username: undefined,
      password: undefined
    },
    host: undefined
  },
  db: {
    file: {
      name: undefined,
      suffix: undefined
    }
  },
  playerNameRestrictions: {
    length: {
      min: 4,
      max: 16
    },
    forbiddenParts: []
  }
};


export class ApplicationProperities {

  static instance: ApplicationProperities;

  private constructor() {
  }

  private static _properties: ApplicationProperties = defaultProperties;

  static get properties(): ApplicationProperties {
    return ApplicationProperities._properties
  }

  static load() {
    this.loadAllPropertyFiles();
    this.validateProperties(ApplicationProperities._properties, defaultProperties)
  }

  private static loadAllPropertyFiles() {

    const resourcePath = path.resolve() + '/resources';

    const allResourceFiles = fs.readdirSync(resourcePath)
    const allYamlResourceFiles = allResourceFiles.filter(fileName => path.extname(fileName).toLowerCase() === ".yaml")

    allYamlResourceFiles.forEach(fileName => {
      const yamlFile = fs.readFileSync(resourcePath + "/" + fileName, "utf8")
      this._properties = {...this._properties, ...YAML.parse(yamlFile) as ApplicationProperties};
    })
  }

  private static validateProperties(obj: any, reference: any, path: string[] = []): void {
    if (obj === null || obj === undefined) {
      throw new Error(`Property ${path.join('.')} is null or undefined`);
    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (const key in reference) {
        if (reference.hasOwnProperty(key)) {
          if (!obj.hasOwnProperty(key)) {
            throw new Error(`Property ${[...path, key].join('.')} is missing`);
          }
          this.validateProperties(obj[key], reference[key], [...path, key]);
        }
      }
    }
  }

}

