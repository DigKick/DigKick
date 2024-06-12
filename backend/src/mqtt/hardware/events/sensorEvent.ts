// noinspection JSUnusedGlobalSymbols
// noinspection JSUnusedGlobalSymbols

export enum SensorEventType {
  HIGH = "HIGH",
  LOW = "LOW",
  BUTTON = "BUTTON",
  LIGHTBARRIER = "LIGHTBARRIER",

  BUTTON_0_HIGH = SensorEventType.BUTTON + `_0_` + SensorEventType.HIGH,
  BUTTON_1_HIGH = SensorEventType.BUTTON + `_1_` + SensorEventType.HIGH,
  BUTTON_2_HIGH = SensorEventType.BUTTON + `_2_` + SensorEventType.HIGH,
  BUTTON_0_LOW = SensorEventType.BUTTON + `_0_` + SensorEventType.LOW,
  BUTTON_1_LOW = SensorEventType.BUTTON + `_1_` + SensorEventType.LOW,
  BUTTON_2_LOW = SensorEventType.BUTTON + `_2_` + SensorEventType.LOW,

  LIGHTBARRIER_0_HIGH = SensorEventType.LIGHTBARRIER +
    `_0_` +
    SensorEventType.HIGH,
  LIGHTBARRIER_1_HIGH = SensorEventType.LIGHTBARRIER +
    `_1_` +
    SensorEventType.HIGH,
  LIGHTBARRIER_0_LOW = SensorEventType.LIGHTBARRIER +
    `_0_` +
    SensorEventType.LOW,
  LIGHTBARRIER_1_LOW = SensorEventType.LIGHTBARRIER +
    `_1_` +
    SensorEventType.LOW,
}
