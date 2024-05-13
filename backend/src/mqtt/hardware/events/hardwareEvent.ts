export enum HardwareEventType {
  _HIGH = "HIGH",
  _LOW = "LOW",
  _BUTTON = "BUTTON",
  _LIGHTBARRIER = "LIGHTBARRIER",

  BUTTON_0_HIGH = HardwareEventType._BUTTON + `.0.` + HardwareEventType._HIGH,
  BUTTON_1_HIGH = HardwareEventType._BUTTON + `.1.` + HardwareEventType._HIGH,
  BUTTON_2_HIGH = HardwareEventType._BUTTON + `.2.` + HardwareEventType._HIGH,
  BUTTON_0_LOW = HardwareEventType._BUTTON + `.0.` + HardwareEventType._LOW,
  BUTTON_1_LOW = HardwareEventType._BUTTON + `.1.` + HardwareEventType._LOW,
  BUTTON_2_LOW = HardwareEventType._BUTTON + `.2.` + HardwareEventType._LOW,

  LIGHTBARRIER_0_HIGH = HardwareEventType._LIGHTBARRIER + `.0.` + HardwareEventType._HIGH,
  LIGHTBARRIER_1_HIGH = HardwareEventType._LIGHTBARRIER + `.1.` + HardwareEventType._HIGH,
  LIGHTBARRIER_0_LOW = HardwareEventType._LIGHTBARRIER + `.0.` + HardwareEventType._LOW,
  LIGHTBARRIER_1_LOW = HardwareEventType._LIGHTBARRIER + `.1.` + HardwareEventType._LOW,
}