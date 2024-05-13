import {BasicTerm} from "../../util/basicTerm";
import {TeamColor} from "../../../models/team";
import {BaseTopicFactory} from "../../util/baseTopicFactory";
import {SoccerTable} from "../../../models/soccerTable";

export class HardwareTopicManager {

  constructor(private _soccerTable: SoccerTable, private _teamColor: TeamColor) {
  }

  private get _baseTeamTopic(): string {
    return BaseTopicFactory.getTeamTopic(this._soccerTable, this._teamColor);
  }

  private get _baseButtonTopic(): string {
    return this._baseTeamTopic + `/${BasicTerm.BUTTON}`;
  }

  buttonTopic(buttonId: number): string {
    return this._baseButtonTopic + `/${buttonId}`;
  }

  get buttonsTopic(): string {
    return this._baseButtonTopic + `/+`;
  }

  private get _baseLightbarrierTopic(): string {
    return this._baseTeamTopic + `/${BasicTerm.LIGHTBARRIER}`;
  }

  lightBarrierTopic(lightbarrierId: number): string {
    return this._baseLightbarrierTopic + `/${lightbarrierId}`;
  }

  get lightbarriersTopic(): string {
    return this._baseLightbarrierTopic + `/+`
  }

}