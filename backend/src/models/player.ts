export class Player {

  name: string
  private readonly _key: string
  private readonly _elo: number

  constructor(name: string, key: string, elo: number) {
    this.name = name;
    this._key = key;
    this._elo = elo;
  }

  get key(): string {
    return this._key;
  }

  get elo(): number {
    return this._elo;
  }

  toJSON() {
    return {
      name: this.name,
      key: this._key,
      elo: this._elo,
    }
  }
}