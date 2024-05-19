import {SoccerTableEventType} from "../events/soccerTableEventType";


export class SoccerTablePayload {
  private readonly _gameResetReason: SoccerTableEventType

  constructor(gameResetReason: SoccerTableEventType) {
    this._gameResetReason = gameResetReason;
  }

  toJSON(): any {
    return {
      gameResetReason: this._gameResetReason
    }
  }
}