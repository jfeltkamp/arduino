#include <math.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

const int potiF = A1;

const int potiX = A0;
const int potiY = A2;

// variables
int valueF = 0;
int holdF = 1;
int valueX = 0;
int holdX = 1;
int valueY = 0;
int holdY = 1;

void setup()
{
  Serial.begin(9600);
  pinMode(potiX, INPUT);
  pinMode(potiY, INPUT);
  lcd.init();
  lcd.backlight();
}

void loop()
{
  valueX = getControle(analogRead(potiX));
  if (valueX != holdX) {
    holdX = valueX;
    lcdOut(0, 0, 'x', holdX, 8);
  }

  valueY = getControle(analogRead(potiY));
  if (valueY != holdY) {
    holdY = valueY;
    lcdOut(0, 1, 'y', holdY, 8);
  }

  valueF = getControle(analogRead(potiF));
  if (valueF != holdF) {
    holdF = valueF;
    lcdOut(8, 0, 'F', holdF, 8);
  }

}

int getControle(int potVal) {
  int medVal = potVal - 511;
  int absVal = (abs(medVal)-16)/32;
  if (medVal < 0) {
    absVal = -absVal;
  }
  return absVal;
}

void lcdOut(int x, int y, char c, int v, int space) {
  lcd.setCursor(x,y);
  for (int blank = 0; blank < space; blank++) {
    lcd.print(" ");
  }
  lcd.setCursor(x,y);
  lcd.print(c);
  lcd.print(" ");
  lcd.print(v);
}