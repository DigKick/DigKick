export class DkParseException extends Error {
  constructor(fromClass: string, toClass: string) {
    super(`Parse error parsing ${fromClass} to ${toClass}.`);
  }
}