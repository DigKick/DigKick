export enum PinOut {
  LOW = 'LOW',
  HIGH = 'HIGH',
}

export interface PinStatusPayload {
  pinOut: PinOut;
}
