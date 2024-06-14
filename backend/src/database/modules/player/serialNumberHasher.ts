export class SerialNumberHasher {

  private constructor() {
  }

  public static async hashSerialNumber(unhashedSerialNumber: string): Promise<string> {
    const hashedSerialNumber = Bun.password.hash(unhashedSerialNumber)
    return await hashedSerialNumber
  }

}