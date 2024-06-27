export enum RequestPayloadType {
  BY_ID = "ID",
  BY_TIME = "TIME",
  BY_RECENT = "RECENT"
}

export interface RequestPayload {
  type: RequestPayloadType
}

export interface RequestPayloadById extends RequestPayload {
  id: number
}

export interface RequestPayloadByTimeSpan extends RequestPayload {
  from: Date,
  to: Date
}

export interface RequestPayloadByRecent extends RequestPayload {
  amount: number
}