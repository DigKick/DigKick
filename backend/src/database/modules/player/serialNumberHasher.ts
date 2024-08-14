export class SerialNumberHasher {
  public static async hashSerialNumber(
    unhashedSerialNumber: string,
  ): Promise<string> {
    const hashedSerialNumber = Bun.password.hash(unhashedSerialNumber);
    return await hashedSerialNumber;
  }

  public static async hashValidator(
    hashedSerialNumber: string,
    unhashedSerialNumber: string,
  ): Promise<boolean> {
    return Bun.password.verify(unhashedSerialNumber, hashedSerialNumber);
  }
}
