import type {RequestPayload} from "./payloads/requestPayload.ts";

export class DataPublisher {

  protected static recentItemCount = 10;

  public publishRecent(amount: number) {
  }

  public publishById(id: number) {
  }

  public publishRequested(request: RequestPayload) {
  }

  public publishByTimeSpan(from: Date, to: Date) {
  }

}