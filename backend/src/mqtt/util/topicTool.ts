export class TopicTool {
  public topicStr: string;
  private readonly _topicSegments: string[];

  constructor(topicStr: string) {
    this.topicStr = topicStr.trim();
    this._topicSegments = topicStr.split('/');
  }

  public get topicSegments(): string[] {
    return this._topicSegments;
  }

  public getSegment(index: number): string {
    if (index < 0 || index > this.topicStr.length - 1) {
      return '';
    }
    return this._topicSegments[index];
  }
}
