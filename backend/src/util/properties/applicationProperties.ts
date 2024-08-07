import fs from "node:fs";
import * as path from 'path';
import {z} from "zod";
import YAML from 'yaml'
import { propertySchema } from './propertySchema.ts';

export class ApplicationProperties {

  private static _properties: any = undefined;

  private constructor() {
  }

  static get() {
    if (this._properties === undefined) this.load()
    return ApplicationProperties._properties
  }

  static load() {
    this._properties = {}
    this.loadAllPropertyFiles();
  }

  private static loadAllPropertyFiles() {

    const resourcePath = path.resolve() + '/resources';

    const allResourceFiles = fs.readdirSync(resourcePath)
    const allYamlResourceFiles = allResourceFiles.filter(fileName => path.extname(fileName).toLowerCase() === ".yaml")


    allYamlResourceFiles.forEach(fileName => {
      const yamlFile = fs.readFileSync(resourcePath + "/" + fileName, "utf8")
      const loadedProps = propertySchema.parse(YAML.parse(yamlFile));
      this._properties = {...this._properties, ...loadedProps};
    })
  }
}

