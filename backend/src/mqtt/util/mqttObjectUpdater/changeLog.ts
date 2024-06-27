export class ChangeLog {
  constructor(
    public oldValue: any,
    public newValue: any,
  ) {}

  public toString = (): string => {
    return `oldValue: ${this.oldValue}, newValue: ${this.newValue}`;
  };
}
