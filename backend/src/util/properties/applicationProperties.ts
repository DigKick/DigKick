import fs from 'node:fs';
import * as path from 'path';
import YAML from 'yaml';
import { getDefaults, type Properties, propertySchema } from './propertySchema.ts';

export class ApplicationProperties {
  private static _properties: Properties = getDefaults(propertySchema);
  private static _loaded = false;

  static get() {
    if (!this._loaded) ApplicationProperties.load();
    return ApplicationProperties._properties;
  }

  static load() {
    this.loadAllPropertyFiles();
    this._loaded = true;
  }

  private static loadAllPropertyFiles() {
    const resourcePath = path.resolve() + '/resources';

    const allResourceFiles = fs.readdirSync(resourcePath);
    const allYamlResourceFiles = allResourceFiles.filter(
      (fileName) => path.extname(fileName).toLowerCase() === '.yaml'
    );

    allYamlResourceFiles.forEach((fileName) => {
      const yamlFile = fs.readFileSync(resourcePath + '/' + fileName, 'utf8');
      const loadedProps = propertySchema.parse(YAML.parse(yamlFile));
      this._properties = propertySchema.parse({ ...this._properties, ...loadedProps });
    });
  }
}
