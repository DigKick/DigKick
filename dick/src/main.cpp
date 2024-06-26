/*********************************************************************
  This is an example for our Monochrome OLEDs based on SH110X drivers

  This example is for a 128x64 size display using I2C to communicate
  3 pins are required to interface (2 I2C and one reset)

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada  for Adafruit Industries.
  BSD license, check license.txt for more information
  All text above, and the splash screen must be included in any redistribution

  i2c SH1106 modified by Rupert Hirst  12/09/21
*********************************************************************/

/*
  IR Breakbeam sensor demo!
*/

#define SENSORPIN 19
#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

#define i2c_Address 0x3c // initialize with the I2C addr 0x3C Typically eBay OLED's

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET -1    //   QT-PY / XIAO
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// variables will change:
int sensorState = 0, lastState = 0; // variable for reading the pushbutton status

void setup()
{
    // initialize the LED pin as an output:
    // initialize the sensor pin as an input:
    pinMode(SENSORPIN, INPUT_PULLUP);

    Serial.begin(9600);

    delay(250);                       // wait for the OLED to power up
    display.begin(i2c_Address, true); // Address 0x3C default
    display.display();
    display.clearDisplay();

    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 0);
    display.println("Booting up!");
    display.display();
    delay(2000);
    display.clearDisplay();
}

void loop()
{
    // read the state of the pushbutton value:
    sensorState = digitalRead(SENSORPIN);

    if (sensorState && !lastState)
    {
        Serial.println("Unbroken");
        display.clearDisplay();
        display.println("Unbroken");
        display.display();
    }
    if (!sensorState && lastState)
    {
        Serial.println("Broken");
        display.clearDisplay();
        display.println("Broken");
        display.display();
    }
    lastState = sensorState;
}