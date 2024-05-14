export class ScorePayload {
  private readonly _score: number

  constructor(score: number) {
    this._score = score;
  }

  toJSON() {
    return {
      score: this._score
    }
  }
}