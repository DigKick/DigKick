export class Player {

  name: string
  elo: number
  private readonly _key: string

  constructor(name: string, key: string, elo: number) {
    this.name = name;
    this._key = key;
    this.elo = elo;
  }

  get key(): string {
    return this._key;
  }

  toJSON() {
    return {
      name: this.name,
      key: this._key,
      elo: this.elo,
    }
  }
}