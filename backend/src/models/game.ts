import { ScoreChange, Team, TeamColor } from './team';
import { GameMode } from './gameMode';

export class Game {
  public static STANDARDGAME_WINNINGSCORE = 10;

  public gameMode: GameMode;
  public teamWhite: Team;
  public teamBlack: Team;

  public pointsToWin: number;

  // Constructor for standard game
  constructor() {
    this.teamWhite = new Team(TeamColor.WHITE);
    this.teamBlack = new Team(TeamColor.BLACK);
    this.gameMode = GameMode.DEFAULT;
    this.pointsToWin = Game.STANDARDGAME_WINNINGSCORE;
  }

  public getTeamByColor(teamColor: TeamColor): Team {
    switch (teamColor) {
      case TeamColor.BLACK:
        return this.teamBlack;
      case TeamColor.WHITE:
        return this.teamWhite;
    }
  }

  resetWinnerTeam() {
    this.teamWhite.isWinner = false;
    this.teamBlack.isWinner = false;
  }

  set teamWinner(team: Team) {
    this.teamWhite.isWinner = false;
    this.teamBlack.isWinner = false;

    team.isWinner = true;
  }

  get teamWinner(): Team | undefined {
    if (this.teamBlack.isWinner) {
      return this.teamBlack;
    }
    if (this.teamWhite.isWinner) {
      return this.teamWhite;
    }
    return undefined;
  }

  updateWhiteTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.teamWhite, change);
  }

  updateBlackTeamScore(change: ScoreChange) {
    this._updateTeamScoreAndWinner(this.teamBlack, change);
  }

  private _updateTeamScoreAndWinner(team: Team, change: ScoreChange) {
    team.score = team.score + change;

    if (team.score >= this.pointsToWin && !this.teamWinner) {
      this.teamWinner = team;
    }

    if (team.score >= this.pointsToWin && !this.teamWinner) {
      this.teamWinner = team;
    }

    if (
      change === ScoreChange.DECREASE &&
      team.score === this.pointsToWin - 1 &&
      this.teamWinner === team
    ) {
      this.resetWinnerTeam();
    }


    if (team.score > this.pointsToWin) {
      team.score = this.pointsToWin;
    }
  }

  public reset() {
    this.teamWhite.reset();
    this.teamBlack.reset();

    this.resetWinnerTeam();
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      teamWhite: this.teamWhite.toJSON(),
      teamBlack: this.teamBlack.toJSON(),
      pointsToWin: this.pointsToWin,
    };
  }
}
