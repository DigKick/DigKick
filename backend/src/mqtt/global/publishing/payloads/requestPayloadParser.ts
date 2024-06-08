import {
  type RequestPayload,
  type RequestPayloadById,
  type RequestPayloadByRecent,
  type RequestPayloadByTimeSpan,
  RequestPayloadType
} from "./requestPayload.ts";
import {RequestPayloadParseException} from "./requestPayloadParseException.ts";

export class RequestPayloadParser {

  public static parseRequestPayload(payload: any): RequestPayload {
    if (!payload.type) {
      throw new RequestPayloadParseException("Payload has no type.")
    }

    if (!Object.values(RequestPayloadType).includes(payload.type)) {
      throw new RequestPayloadParseException(`Payload type has no valid type: ${payload.type}`)
    }

    switch (payload.type) {
      case RequestPayloadType.BY_ID:
        if (this._isExactRequestPayloadById(payload)) {
          return payload as RequestPayloadById;
        }
        throw new RequestPayloadParseException(`Payload could not be parsed to type: ${payload.type}`)

      case RequestPayloadType.BY_RECENT:
        if (this._isExactRequestPayloadByRecent(payload)) {
          return payload as RequestPayloadByRecent;
        }
        throw new RequestPayloadParseException(`Payload could not be parsed to type: ${payload.type}`)


      case RequestPayloadType.BY_TIME:
        if (this._isExactRequestPayloadByTimeSpan(payload)) {
          return payload as RequestPayloadByTimeSpan;
        }
        throw new RequestPayloadParseException(`Payload could not be parsed to type: ${payload.type}`)

      default:
        throw new RequestPayloadParseException(`Implementation error.`);
    }
  }


  private static _isExactRequestPayloadById(payload: any): payload is RequestPayloadById {
    return payload &&
      typeof payload.id === 'number' &&
      payload.type === RequestPayloadType.BY_ID &&
      this._arraysEqual(Object.keys(payload), ["type", "id"]);
  }

  private static _isExactRequestPayloadByRecent(payload: any): payload is RequestPayloadByRecent {
    return payload &&
      typeof payload.amount === 'number' &&
      payload.type === RequestPayloadType.BY_RECENT &&
      this._arraysEqual(Object.keys(payload), ["type", "amount"]);
  }

  private static _isExactRequestPayloadByTimeSpan(payload: any): payload is RequestPayloadByTimeSpan {
    return payload &&
      typeof payload.from === 'object' &&
      typeof payload.to === 'object' &&
      payload.type === RequestPayloadType.BY_TIME &&
      this._arraysEqual(Object.keys(payload), ["type", "from", "to"]);
  }

  private static _arraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    arr1 = arr1.sort()
    arr2 = arr2.sort()

    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

}