import fs from "node:fs";
import * as path from 'path';
import {z} from "zod";
import YAML from 'yaml'


export const propertySchema = z.object({
  digkick: z.object({
    banner: z.boolean().default(true)
  }).optional(),

  mqtt: z.object({
    login: z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }),
    host: z.string().min(1),
  }),

  db: z.object({
    file: z.object({
      name: z.string().min(1),
      suffix: z.string().min(1)
    })
  }),

  player: z.object({
    name: z.object({
      restrictions: z.object({
        length: z.object({
          min: z.number().positive({message: "Min player name length must be greater than 0!"}).optional(),
          max: z.number().positive({message: "Max player name length must be greater than 0!"}).optional()
        }).optional(),
        forbiddenParts: z.array(z.object({value: z.string()})).optional()
      }).optional()
    }).optional()
  }).optional(),

})


export class ApplicationProperities {

  private constructor() {
  }
  
  private static _properties: any = undefined;

  static get properties() {
    if (this._properties === undefined) this.load()
    return ApplicationProperities._properties
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

