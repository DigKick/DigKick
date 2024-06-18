import type {DkPayload} from "../../client/payloads/dkPayload";

export interface TableRegisterPayload extends DkPayload {
  name: string;
}
