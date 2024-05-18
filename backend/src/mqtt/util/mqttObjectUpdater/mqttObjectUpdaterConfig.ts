export interface MqttObjectUpdaterConfig {
  prefix?: string,
  maxDepth?: number,

  instantPublish?: boolean,
  publishWithRetain?: boolean
}
