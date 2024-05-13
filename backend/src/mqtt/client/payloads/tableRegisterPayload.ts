import type {DkPayload} from "./dkPayload";

export interface TableRegisterPayload extends DkPayload {
  tableId: string;
}