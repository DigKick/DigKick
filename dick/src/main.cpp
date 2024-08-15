/*********************************************************************
 Main-Programm for DIG-KICK
 * use light barrier to detect goals
 * connect to WIFI and MQTT-Broker
 * read button states to manipulate score
 * use leds strip to show current score
*********************************************************************/
#ifdef __AVR__
#include <avr/power.h>
#endif
#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#include <CONFIG.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <cstdio>
#include <SPI.h>
#include <MFRC522.h>

#define BUTTON_DECREASE_PIN 4
#define BUTTON_ADD_PIN 17
#define BUTTON_RESET_PIN 16
#define LEDPIN 12
// #define LEDPIN 12
#define LEDCOUNT 22

// #define LIGHTBARRIER_PIN 33
#define LIGHTBARRIER_PIN 33
#define INTERNAL_LED_PIN 2

#define SS_PIN 5   // ESP32 pin GPIO5
#define RST_PIN 27 // ESP32 pin GPIO27

WiFiClient wifiClient;
PubSubClient client(wifiClient);
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(LEDCOUNT, LEDPIN, NEO_GRB + NEO_KHZ800);

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key; 


int buttonIncreaseState = 0;
int lastButtonIncreaseState = 0;
int buttonDecreaseState = 0;
int lastbuttonDecreaseState = 0;
int buttonResetState = 0;
int lastButtonResetState = 0;

// variables will change:
int sensorState = 0, lastState = 0; // variable for reading the pushbutton status

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

void turnOffLed(int index)
{
  pixels.setPixelColor(index, pixels.Color(0, 0, 0));
}

int32_t getRandomColor()
{
  int32_t r = rand() % 256;
  int32_t g = rand() % 256;
  int32_t b = rand() % 256;
  return pixels.Color(r, g, b);
}

uint32_t hexToColor(const char *hex)
{
  return strtol(hex, NULL, 16);
}

bool endsWith(const char *str, const char *suffix)
{
  int strLength = strlen(str);
  int suffixLength = strlen(suffix);
  if (strLength < suffixLength)
    return false;
  return strcmp(str + strLength - suffixLength, suffix) == 0;
}

void win()
{
  long startTime = millis();
  while (millis() - startTime < 10000)
  {
    pixels.clear();
    for (int i = 0; i < LEDCOUNT; i++)
    {
      int32_t randomColor = getRandomColor();
      pixels.setPixelColor(i, randomColor);
    }
    pixels.show();
    delay(100);
  }
  pixels.clear();
  pixels.show();
}

void visualizeColors(JsonArray colors)
{
  Serial.println("visualizeColors");
  pixels.clear();
  pixels.show();
  size_t colorCount = colors.size();
  if (colorCount == 0)
  {
    return;
  }

  Serial.println("Turning on lights: ");
  Serial.println(colorCount);

  for (int i = 0; i < colorCount; i++)
  {

    const char *colorHex = colors[i];
    // empty color -> turn off led
    if (strcmp(colorHex, "") == 0)
    {
      turnOffLed(i);
    }
    else
    {
      uint32_t color = hexToColor(colorHex);
      pixels.setPixelColor(i, color);
    }
    pixels.show();
  }
}

void sendPlayerRegister(String uid) {
  JsonDocument playerRegisterJson;

  playerRegisterJson["serialNumber"] = uid;

  char playerRegisterPayload[128];
  serializeJson(playerRegisterJson, playerRegisterPayload);
  char topic[50];
  sprintf(topic, "table/%s/game/team/%s/nfc-reader", TABLE_ID, TEAM_ID);
  client.publish(topic, playerRegisterPayload);
}


void sendButtonState(int button, bool state)
{
  JsonDocument buttonStatePayloadJson;
  if (state)
  {
    buttonStatePayloadJson["pinOut"] = "HIGH";
  }
  else
  {
    buttonStatePayloadJson["pinOut"] = "LOW";
  }

  char buttonStatePayload[128];
  serializeJson(buttonStatePayloadJson, buttonStatePayload);
  char topic[50];
  sprintf(topic, "table/%s/game/team/%s/button/%d", TABLE_ID, TEAM_ID, button);
  Serial.println("publish");
  client.publish(topic, buttonStatePayload);
}

void sendLightBarrierState(int lightBarrier, bool state)
{
  JsonDocument lightBarrierPayloadJson;
  if (state)
  {
    lightBarrierPayloadJson["pinOut"] = "HIGH";
  }
  else
  {
    lightBarrierPayloadJson["pinOut"] = "LOW";
  }

  char lightBarrierStatePayload[128];
  serializeJson(lightBarrierPayloadJson, lightBarrierStatePayload);
  char topic[50];
  sprintf(topic, "table/%s/game/team/%s/light_barrier/%d", TABLE_ID, TEAM_ID, lightBarrier);
  Serial.println(topic);
  client.publish(topic, lightBarrierStatePayload);
}

void processLeds(byte *payload)
{
  Serial.println("Processing led request!");
  JsonDocument doc;

  DeserializationError error = deserializeJson(doc, payload);

  // Check for parsing errors
  if (error)
  {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  if (doc.containsKey("animation") && !doc["animation"].isNull())
  {
    const char *animation = doc["animation"];

    if (endsWith(animation, "win"))
    {
      win();
      return;
    }
    else
    {
      Serial.println("Animation not supported!");
    }
  }
  if (doc.containsKey("colors") && !doc["colors"].isNull())
  {
    Serial.println("here");
    JsonArray colors = doc["colors"];
    visualizeColors(colors);
  }
  else
  {
    Serial.println("No colors given!");
  }
}

void processDisplay(byte *payload)
{
  Serial.println("Processing display request!");
  Serial.println("not yet implemented!");
}

void messageFromTopicReceived(char *topic, byte *payload, unsigned int length)
{
  Serial.println("--- new message from broker ---");
  Serial.print("Topic:    ");
  Serial.print(topic);
  Serial.println("");
  if (endsWith(topic, "leds"))
  {
    processLeds(payload);
  }
  else if (endsWith(topic, "display"))
  {
    processDisplay(payload);
  }
  else
  {
    Serial.println("can not process unknown topic!");
  }
}

void setup_wifi()
{
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);
  WiFi.setHostname(HOSTNAME);
  WiFi.begin(SSID, WLAN_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print('.');
    delay(1000);
  }
  digitalWrite(INTERNAL_LED_PIN, HIGH);
  Serial.println(WiFi.localIP());
}

void setup_mqtt()
{
  client.setServer(MQTT_BROKER_ADRRESS, MQTT_PORT);
  client.setCallback(messageFromTopicReceived);

  // Loop until we're (re)connected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");

    if (client.connect(MQTT_CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD))
    {
      Serial.println("connected");
      JsonDocument registerPayloadJson;
      registerPayloadJson["name"] = TABLE_ID;
      char registerPayload[128];
      serializeJson(registerPayloadJson, registerPayload);
      client.publish("table/register", registerPayload);
      char displayTopic[50];
      sprintf(displayTopic, "table/%s/game/team/%s/display", TABLE_ID, TEAM_ID);
      client.subscribe(displayTopic);
      char ledsTopic[50];
      sprintf(ledsTopic, "table/%s/game/team/%s/leds", TABLE_ID, TEAM_ID);
      client.subscribe(ledsTopic);
    }
    else
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup_lightstrip()
{
  pixels.begin();
  pixels.clear();
  pixels.show();
  pixels.setBrightness(LED_BRIGHTNESS);
}

void setup_pins()
{
  pinMode(LIGHTBARRIER_PIN, INPUT_PULLUP);
  pinMode(INTERNAL_LED_PIN, OUTPUT);
  pinMode(BUTTON_ADD_PIN, INPUT_PULLUP);
  pinMode(BUTTON_DECREASE_PIN, INPUT_PULLUP);
  pinMode(BUTTON_RESET_PIN, INPUT_PULLUP);
}

void setup_rfid()
{
  SPI.begin();     // init SPI bus
  rfid.PCD_Init(); // init MFRC522
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  //printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
  Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");
}

void setup()
{
  Serial.begin(9600);
  setup_pins();
  setup_lightstrip();
  setup_wifi();
  setup_mqtt();
  setup_rfid();
}

void checkAndProcessLightbarrier()
{
  sensorState = digitalRead(LIGHTBARRIER_PIN);

  if (sensorState && !lastState)
  {
    sendLightBarrierState(0, sensorState);
    Serial.println("Lightbarrier now unbroken");
  }
  if (!sensorState && lastState)
  {
    sendLightBarrierState(0, sensorState);
    Serial.println("Lightbarrier broken! Goal detected");
  }
  lastState = sensorState;
}

void checkAndProcessButtons()
{
  // Check button states
  buttonIncreaseState = digitalRead(BUTTON_ADD_PIN);
  if (buttonIncreaseState != lastButtonIncreaseState)
  {
    Serial.printf("Button Reset State %d:", buttonIncreaseState);
    Serial.println();
    sendButtonState(0, buttonIncreaseState);
  }
  lastButtonIncreaseState = buttonIncreaseState;

  buttonDecreaseState = digitalRead(BUTTON_DECREASE_PIN);
  if (buttonDecreaseState != lastbuttonDecreaseState)
  {
    Serial.printf("Button Increase State %d:", buttonDecreaseState);
    Serial.println();
    sendButtonState(1, buttonDecreaseState);
  }
  lastbuttonDecreaseState = buttonDecreaseState;

  buttonResetState = digitalRead(BUTTON_RESET_PIN);
  if (buttonResetState != lastButtonResetState)
  {
    Serial.printf("Button Decrease State %d:", buttonResetState);
    Serial.println();
    sendButtonState(2, buttonResetState);
  }
  lastButtonResetState = buttonResetState;
}

void checkAndProcessRFID()
{
  if (!rfid.PICC_IsNewCardPresent())
  {
    return;
  }
  if (!rfid.PICC_ReadCardSerial())
  {
    return;
  }

  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.print("RFID/NFC Tag Type: ");
  Serial.println(rfid.PICC_GetTypeName(piccType));

  // print UID in Serial Monitor in the hex format
  Serial.print("UID:");
  String uid = getUid();
  Serial.println(uid);
  Serial.println();

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  sendPlayerRegister(uid);
}

void loop()
{
  // mqtt check and update
  client.loop();
  // check lightbarrier
  checkAndProcessLightbarrier();
  // check buttons
  checkAndProcessButtons();
  // check RFID
  checkAndProcessRFID();
}