import {Team} from "./team";

export class Game {
  public static STANDARDTEAMS: Team[] = [Team.WHITE, Team.BLACK];
  public static STANDARDGAME_WINNINGSCORE = 10;

  public id: string;
  public teams: Team[] = [];

  private _scores: Map<Team, number> = new Map<Team, number>();
  private readonly _pointsToWin: number;
  private _winner: undefined | Team = undefined;

  // Constructor for standard game
  constructor(id: string) {
    this.id = id;
    this.teams = Game.STANDARDTEAMS;

    this.teams.forEach((team) => {
      this._scores.set(team, 0);
    });

    this._pointsToWin = Game.STANDARDGAME_WINNINGSCORE;
  }

  get winner() {
    return this._winner;
  }

  getTeamScore(team: Team): number {
    const score = this._scores.get(team);
    if (!score) {
      throw Error("There is no '" + team.valueOf() + "'team. ");
    }
    return score;
  }

  teamScores(team: Team): void {
    if (!this.teams.includes(team)) {
      throw Error(
        "Team '" + team.valueOf() + "' is not participating in this game."
      );
    }

    const currentScore = this._scores.get(team);
    if (currentScore === undefined) {
      throw new Error(
        "Score for team '" + team.valueOf() + "' is not initialized."
      );
    }

    const newScore = currentScore + 1;
    this._scores.set(team, newScore);
    this.checkIfTeamWon(team);
  }

  private checkIfTeamWon(team: Team) {
    const score = this._scores.get(team);

    if (!score) {
      throw Error("Team " + team.valueOf() + " is not in this game.");
    }

    if (score >= this._pointsToWin) {
      if (this._winner !== undefined || this._winner == team) {
        // game already over
        return;
      }

      this._winner = team;
    }
  }

  toJSON() {
    return {
      id: this.id,
      pointsToWin: this._pointsToWin,
      teams: this.teams,
      points: Array.from(this._scores.entries()),
      winner: this.winner
    }
  }

}
