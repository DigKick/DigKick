export class Obj2StringParser {

  public static objectToString(obj: any): string | undefined {
    if (!obj) return undefined
    return JSON.stringify(obj).replaceAll("_", "");
  }

  public static arrayToString(arr: any[]) {
    if (!arr) return undefined
    
    const itemString = arr.map(item => Obj2StringParser.objectToString(item)).join(', ');

    return `[${itemString.trim()}]`
  }

}