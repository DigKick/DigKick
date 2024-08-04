export class Obj2StringParser {
  public static objectToString(obj: any): string | undefined {
    if (!obj) return undefined;
    return JSON.stringify(obj).replaceAll('_', '');
  }
}
