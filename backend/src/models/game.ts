import {ScoreChange, Team, TeamColor} from "./team";

export class Game {
  public static STANDARDGAME_WINNINGSCORE = 10;

  public homeTeam: Team;
  public guestTeam: Team;
  private _winnerTeam!: Team | undefined;

  public readonly pointsToWin: number;

  // Constructor for standard game
  constructor() {
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
    team.score = team.score + change

    if (team.score >= this.pointsToWin) {
      this.winnerTeam = team
    }

    if (change === ScoreChange.DECREASE && team.score === this.pointsToWin - 1 && this.winnerTeam === team) {
      this.resetWinnerTeam();
    }
  }

  public reset() {
    this.homeTeam.score = 0;
    this.guestTeam.score = 0;

    this._winnerTeam = undefined;
  }

  toJSON() {
    return {
      teams: [this.guestTeam, this.homeTeam],
      pointsToWin: this.pointsToWin,
      winner: this._winnerTeam
    }
  }

}
