import { TableEventType } from '../events/tableEventType.ts';

export class TablePayload {
  private readonly _gameResetReason: TableEventType;

  constructor(gameResetReason: TableEventType) {
    this._gameResetReason = gameResetReason;
  }

  toJSON(): any {
    return {
      gameResetReason: this._gameResetReason,
    };
  }
}
