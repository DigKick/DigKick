import YAML from "yaml";
import fs from "node:fs";
import * as path from 'path';

interface ApplicationProperties {

  digkick: {
    banner: boolean | null
  } | null

  mqtt: {
    login: {
      username: String | null,
      password: String | null
    } | null
    host: String | null
  } | null

  db: {
    file: {
      name: String | null,
      suffix: String | null
    } | null
  } | null

  playerNameRestrictions: {
    length: {
      min: Number | null,
      max: Number | null
    } | null
    forbiddenParts: Array<String> | null
  } | null
}

const defaultProperties: ApplicationProperties = {

  digkick: {
    banner: true,
  },

  mqtt: {
    login: {
      username: null,
      password: null
    },
    host: null
  },
  db: {
    file: {
      name: null,
      suffix: null
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


export class PropertiesReader {

  static instance: PropertiesReader;
  properties: ApplicationProperties = defaultProperties;
  private readonly resourcePath = path.resolve() + '/resources';

  private constructor() {
    this.loadAllPropertyFiles();
    this.validateProperties(this.properties, defaultProperties)
  }

  static getInstance() {
    if (!PropertiesReader.instance) {
      PropertiesReader.instance = new PropertiesReader();
    }
    return this.instance
  }

  private loadAllPropertyFiles() {
    const allResourceFiles = fs.readdirSync(this.resourcePath)
    const allYamlResourceFiles = allResourceFiles.filter(fileName => path.extname(fileName).toLowerCase() === ".yaml")

    allYamlResourceFiles.forEach(fileName => {
      const yamlFile = fs.readFileSync(this.resourcePath + "/" + fileName, "utf8")
      this.properties = {...this.properties, ...YAML.parse(yamlFile) as ApplicationProperties};
    })
  }

  private validateProperties(obj: any, reference: any, path: string[] = []): void {
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

