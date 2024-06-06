export class RegisteredTableListPayload {
  private readonly _tableNames: string[];

  constructor(tableNames: string[]) {
    this._tableNames = tableNames;
  }

  toJSON() {
    return {
      names: this._tableNames,
    };
  }
}
