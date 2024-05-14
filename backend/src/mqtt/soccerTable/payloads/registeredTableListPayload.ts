export class RegisteredTableListPayload {

  private _tableIds: string[]

  constructor(tableIds: string[]) {
    this._tableIds = tableIds;
  }

  toJSON() {
    return {
      tableIds: this._tableIds
    }
  }
}