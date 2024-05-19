export enum HardwareEventType {
  HIGH = "HIGH",
  LOW = "LOW",
  BUTTON = "BUTTON",
  LIGHTBARRIER = "LIGHTBARRIER",

  BUTTON_0_HIGH = HardwareEventType.BUTTON + `_0_` + HardwareEventType.HIGH,
  BUTTON_1_HIGH = HardwareEventType.BUTTON + `_1_` + HardwareEventType.HIGH,
  BUTTON_2_HIGH = HardwareEventType.BUTTON + `_2_` + HardwareEventType.HIGH,
  BUTTON_0_LOW = HardwareEventType.BUTTON + `_0_` + HardwareEventType.LOW,
  BUTTON_1_LOW = HardwareEventType.BUTTON + `_1_` + HardwareEventType.LOW,
  BUTTON_2_LOW = HardwareEventType.BUTTON + `_2_` + HardwareEventType.LOW,

  LIGHTBARRIER_0_HIGH = HardwareEventType.LIGHTBARRIER +
    `_0_` +
    HardwareEventType.HIGH,
  LIGHTBARRIER_1_HIGH = HardwareEventType.LIGHTBARRIER +
    `_1_` +
    HardwareEventType.HIGH,
  LIGHTBARRIER_0_LOW = HardwareEventType.LIGHTBARRIER +
    `_0_` +
    HardwareEventType.LOW,
  LIGHTBARRIER_1_LOW = HardwareEventType.LIGHTBARRIER +
    `_1_` +
    HardwareEventType.LOW,
}
