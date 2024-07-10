/*
 * This ESP32 code is created by esp32io.com
 *
 * This ESP32 code is released in the public domain
 *
 * For more detail (instruction and wiring diagram), visit https://esp32io.com/tutorials/esp32-rfid-nfc
 */

// https://github.com/miguelbalboa/rfid

#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5   // ESP32 pin GPIO5
#define RST_PIN 27 // ESP32 pin GPIO27

MFRC522 rfid(SS_PIN, RST_PIN);

byte nuidPICC[4];

MFRC522::MIFARE_Key key;

String getUid()
{
  String uid;
  for (int i = 0; i < rfid.uid.size; i++)
  {
    uid.concat(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
    uid.concat(String(rfid.uid.uidByte[i], 16));
  }
  return uid;
}

void setup()
{
  Serial.begin(9600);
  SPI.begin();     // init SPI bus
  rfid.PCD_Init(); // init MFRC522

  for (byte i = 0; i < 6; i++)
  {
    key.keyByte[i] = 0xFF;
  }
  Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");
}

void loop()
{
  if (!rfid.PICC_IsNewCardPresent())
  {
    return;
  }
  if (!rfid.PICC_ReadCardSerial())
  {
    return;
  }

  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.println(rfid.PICC_GetTypeName(piccType));

  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
      piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
      piccType != MFRC522::PICC_TYPE_MIFARE_4K)
  {
    Serial.println(F("Your tag is not of type MIFARE Classic."));
    return;

    if (rfid.uid.uidByte[0] != nuidPICC[0] ||
        rfid.uid.uidByte[1] != nuidPICC[1] ||
        rfid.uid.uidByte[2] != nuidPICC[2] ||
        rfid.uid.uidByte[3] != nuidPICC[3])
    {
      Serial.println(F("A new card has been detected."));

      // Store NUID into nuidPICC array
      for (byte i = 0; i < 4; i++)
      {
        nuidPICC[i] = rfid.uid.uidByte[i];
      }

      Serial.println(F("The NUID tag is:"));
      Serial.print(F("In hex: "));
      Serial.println();
      Serial.print(F("In dec: "));
      Serial.println();
    }
    else
      Serial.println(F("Card read previously."));
  }
}
