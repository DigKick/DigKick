export class DataPublisher {
  protected static recentItemCount = 10;

  public static async publishAll() {}

  public async publishRecent(amount: number) {}

  public async publishById(id: number) {}

  public async publishByTimeSpan(from: Date, to: Date) {}
}
