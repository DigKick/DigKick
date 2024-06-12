// noinspection JSUnusedGlobalSymbols
// noinspection JSUnusedGlobalSymbols

export enum SensorEventType {
  HIGH = "HIGH",
  LOW = "LOW",
  BUTTON = "BUTTON",
  LIGHT_BARRIER = "LIGHT_BARRIER",

  BUTTON_0_HIGH = SensorEventType.BUTTON + `_0_` + SensorEventType.HIGH,
  BUTTON_1_HIGH = SensorEventType.BUTTON + `_1_` + SensorEventType.HIGH,
  BUTTON_2_HIGH = SensorEventType.BUTTON + `_2_` + SensorEventType.HIGH,
  BUTTON_0_LOW = SensorEventType.BUTTON + `_0_` + SensorEventType.LOW,
  BUTTON_1_LOW = SensorEventType.BUTTON + `_1_` + SensorEventType.LOW,
  BUTTON_2_LOW = SensorEventType.BUTTON + `_2_` + SensorEventType.LOW,

  LIGHT_BARRIER_0_HIGH = SensorEventType.LIGHT_BARRIER +
    `_0_` +
    SensorEventType.HIGH,
  LIGHT_BARRIER_1_HIGH = SensorEventType.LIGHT_BARRIER +
    `_1_` +
    SensorEventType.HIGH,
  LIGHT_BARRIER_0_LOW = SensorEventType.LIGHT_BARRIER +
    `_0_` +
    SensorEventType.LOW,
  LIGHT_BARRIER_1_LOW = SensorEventType.LIGHT_BARRIER +
    `_1_` +
    SensorEventType.LOW,
}
