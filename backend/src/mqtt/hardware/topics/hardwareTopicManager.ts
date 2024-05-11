import {BasicTerm} from "../../abstract/basicTerm";
import {TeamColor} from "../../../models/team";

export class HardwareTopicManager {

  constructor(private _soccerTableId: string, private _teamColor: TeamColor) {
  }

  private get _baseTopic(): string {
    return `/${BasicTerm.TABLE}/${this._soccerTableId}/${BasicTerm.TEAM}/${this._teamColor}`;
  }

  private get _baseButtonTopic(): string {
    return this._baseTopic + `/${BasicTerm.BUTTON}`;
  }

  buttonTopic(buttonId: number): string {
    return this._baseButtonTopic + `/${buttonId}`;
  }

  get buttonsTopic(): string {
    return this._baseButtonTopic + `/+`;
  }

  private get _baseLightbarrierTopic(): string {
    return this._baseTopic + `/${BasicTerm.LIGHTBARRIER}`;
  }

  lightBarrierTopic(lightbarrierId: number): string {
    return this._baseLightbarrierTopic + `/${lightbarrierId}`;
  }

  get lightbarriersTopic(): string {
    return this._baseLightbarrierTopic + `/+`
  }

}