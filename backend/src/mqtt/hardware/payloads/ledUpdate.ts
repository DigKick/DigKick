export class LedUpdatePayload {

  colors: Array<string>
  animation: string

  constructor(colors: Array<string>, animation: string) {
    this.colors = colors;
    this.animation = animation;
  }

  toJSON() {
    return {
      colors: this.colors,
      animation: undefined
    }
  }
}