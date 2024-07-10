#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
    #include <avr/power.h>
#endif
#include "Arduino.h"

#define BUTTON_ADD_PIN 15
#define BUTTON_DECREASE_PIN 2
#define LEDPIN 18
#define LEDCOUNT 100

#define HIQS_COLOR_RED 35
#define HIQS_COLOR_GREEN 150
#define HIQS_COLOR_BLUE 50

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(LEDCOUNT, LEDPIN, NEO_GRB + NEO_KHZ800);

int delayval = 100;
int count = 0;
int buttonAddState = 0;
bool buttonAddAlreadyPressed = false;
int buttonDecreaseState = 0;
bool buttonDecreasedAlreadyPressed = false;

void turnOffLed(int index) {
    pixels.setPixelColor(index, pixels.Color(0, 0, 0));
}

int32_t getRandomColor() {
    int32_t r = rand() % 256;
    int32_t g = rand() % 256;
    int32_t b = rand() % 256;
    return pixels.Color(r, g, b);
}

void win() {
    long startTime = millis();
    while(millis() - startTime < 10000) {
        pixels.clear();
        for (int i = 0; i < LEDCOUNT; i++)
        {
            int32_t randomColor = getRandomColor();
            pixels.setPixelColor(i, randomColor);
        }
        pixels.show();
        delay(100);
    }
}

void showCount(int count)
{
    int32_t c = pixels.Color(HIQS_COLOR_RED, HIQS_COLOR_GREEN, HIQS_COLOR_BLUE);
    for (int i = 0; i < LEDCOUNT; i++)
    {
        if(i < count) {
            pixels.setPixelColor(i, c);
        }
        else {
            turnOffLed(i);
        }
    }
    pixels.show();
}

void setup()
{
    pinMode(BUTTON_ADD_PIN, INPUT_PULLUP);
    pinMode(BUTTON_DECREASE_PIN, INPUT_PULLUP);
    Serial.begin(9600);
    pixels.begin();
    pixels.clear();
    pixels.show();
    pixels.setBrightness(50);
}

void add()
{
    if (count < LEDCOUNT - 1)
    {
        count++;
    }
}

void decrease()
{
    if (count > 0)
    {
        count--;
    }
}

void loop()
{
    buttonAddState = digitalRead(BUTTON_ADD_PIN);
    if (buttonAddState == HIGH && !buttonAddAlreadyPressed)
    {
        add();
        buttonAddAlreadyPressed = true;
    }
    if (buttonAddState == LOW)
    {
        buttonAddAlreadyPressed = false;
    }

    buttonDecreaseState = digitalRead(BUTTON_DECREASE_PIN);
    if (buttonDecreaseState == HIGH && !buttonDecreasedAlreadyPressed)
    {
        decrease();
        buttonDecreasedAlreadyPressed = true;
    }
    if (buttonDecreaseState == LOW)
    {
        buttonDecreasedAlreadyPressed = false;
    }
    Serial.print("COUNT: ");
    Serial.print(count, DEC);
    showCount(count);
    if(count == 10) {
        win();
        count = 0;
    }
}