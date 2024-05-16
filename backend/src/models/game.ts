import {ScoreChange, Team, TeamColor} from "./team";

export class Game {
  public static STANDARDGAME_WINNINGSCORE = 10;

  public teamWhite: Team;
  public teamBlack: Team;
  private _winnerTeam!: Team | undefined;

  public readonly pointsToWin: number;

  // Constructor for standard game
  constructor() {
    this.teamWhite = new Team(TeamColor.WHITE);
    this.teamBlack = new Team(TeamColor.BLACK);

    this.pointsToWin = Game.STANDARDGAME_WINNINGSCORE;
  }

  public getTeamByColor(teamColor: TeamColor): Team {
    switch (teamColor) {
      case TeamColor.BLACK:
        return this.teamBlack
      case TeamColor.WHITE:
        return this.teamWhite
    }
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
    this._updateTeamScoreAndWinner(this.teamWhite, change);
  }

  updateBlackTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.teamBlack, change)
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
    this.teamWhite.score = 0;
    this.teamBlack.score = 0;

    this._winnerTeam = undefined;
  }

  toJSON() {
    return {
      teams: [this.teamBlack, this.teamWhite],
      pointsToWin: this.pointsToWin,
      winner: this._winnerTeam
    }
  }

}
