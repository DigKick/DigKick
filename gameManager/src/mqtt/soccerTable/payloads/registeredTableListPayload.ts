export class RegisteredTableListPayload {
  private readonly _tableIds: string[];

  constructor(tableIds: string[]) {
    this._tableIds = tableIds;
  }

  toJSON() {
    return {
      ids: this._tableIds,
    };
  }
}
