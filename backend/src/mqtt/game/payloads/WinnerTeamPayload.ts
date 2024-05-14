import {Team} from "../../../models/team";

export class WinnerTeamPayload {
  private readonly _winnerTeam: Team | undefined;

  constructor(winnerTeam: Team) {
    this._winnerTeam = winnerTeam;
  }

  toJSON() {
    return {
      winnerTeam: this._winnerTeam
    }
  }
}