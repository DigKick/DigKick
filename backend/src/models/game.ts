import {ScoreChange, Team, TeamColor} from "./team";

export class Game {
  public static STANDARDGAME_WINNINGSCORE = 10;

  public whiteTeam: Team;
  public blackTeam: Team;
  private _winnerTeam!: Team | undefined;

  public readonly pointsToWin: number;

  // Constructor for standard game
  constructor() {
    this.whiteTeam = new Team(TeamColor.WHITE, this);
    this.blackTeam = new Team(TeamColor.BLACK, this);

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

  updateWhiteTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.whiteTeam, change);
  }

  updateBlackTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.blackTeam, change)
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
    this.whiteTeam.score = 0;
    this.blackTeam.score = 0;

    this._winnerTeam = undefined;
  }

  toJSON() {
    return {
      teams: [this.blackTeam, this.whiteTeam],
      pointsToWin: this.pointsToWin,
      winner: this._winnerTeam
    }
  }

}
