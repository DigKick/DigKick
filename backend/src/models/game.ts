import {Team, TeamColor} from "./team";

export class Game {
  public static STANDARDGAME_WINNINGSCORE = 10;

  public id: string;

  public homeTeam: Team;
  public guestTeam: Team;
  private _winnerTeam?: Team = undefined;

  public readonly pointsToWin: number;

  // Constructor for standard game
  constructor(id: string) {
    this.id = id;

    this.homeTeam = new Team(TeamColor.WHITE, this);
    this.guestTeam = new Team(TeamColor.BLACK, this);

    this.pointsToWin = Game.STANDARDGAME_WINNINGSCORE;
  }

  set winnerTeam(team: Team) {
    if (this._winnerTeam)
      return
    this._winnerTeam = team
  }

  get winnerTeam(): Team | undefined {
    if (this._winnerTeam instanceof Team) {
      return this._winnerTeam;
    }
    return undefined;
  }

  toJSON() {
    return {
      id: this.id,
      pointsToWin: this.pointsToWin,
      teams: [this.guestTeam, this.homeTeam],
      winner: this._winnerTeam
    }
  }

}
