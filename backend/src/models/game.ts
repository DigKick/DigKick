import {ScoreChange, Team, TeamColor} from "./team";

export class Game {
  public static STANDARDGAME_WINNINGSCORE = 10;

  public id: string;

  public homeTeam: Team;
  public guestTeam: Team;
  private _winnerTeam!: Team | undefined;

  public readonly pointsToWin: number;

  // Constructor for standard game
  constructor(id: string) {
    this.id = id;

    this.homeTeam = new Team(TeamColor.WHITE, this);
    this.guestTeam = new Team(TeamColor.BLACK, this);

    this.pointsToWin = Game.STANDARDGAME_WINNINGSCORE;
  }

  resetWinnerTeam() {
    this._winnerTeam = undefined;
  }

  set winnerTeam(team: Team | undefined) {
    if (this._winnerTeam)
      return;
    this._winnerTeam = team;
  }

  get winnerTeam(): Team | undefined {
    if (this._winnerTeam instanceof Team) {
      return this._winnerTeam;
    }
    return undefined;
  }

  updateHomeTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.homeTeam, change);
  }

  updateGuestTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.guestTeam, change)
  }

  private _updateTeamScoreAndWinner(team: Team, change: ScoreChange) {
    team.score = Math.max(0, team.score + change)

    if (team.score >= this.pointsToWin) {
      this.winnerTeam = team
    }

    if (change === ScoreChange.DECREASE && team.score === this.pointsToWin - 1 && this.winnerTeam === team) {
      this.resetWinnerTeam();
    }
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
