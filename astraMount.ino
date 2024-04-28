#include <math.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <AccelStepper.h>

#define motorInterfaceType 1

AccelStepper stepper1(motorInterfaceType, 2, 5);  //STEP-Pin, DIR-Pin
AccelStepper stepper2(motorInterfaceType, 3, 6);  //STEP-Pin, DIR-Pin

LiquidCrystal_I2C lcd(0x27, 16, 2);

// inputs
const int potiF = A1;
const int potiX = A0;
const int potiY = A2;

const int enablePin = 8;

// constants
const int acceleration = 500;
const int maxSpeed = 930;
const int speedInterval = maxSpeed / 31;

// variables
int valueF = 0;
int holdF = 1;

int valueX = 0;
int holdX = 1;
float speedX = 0.0;

int valueY = 0;
int holdY = 1;
float speedY = 0.0;

void setup()
{
  Serial.begin(9600);
  pinMode(potiX, INPUT);
  pinMode(potiY, INPUT);
  lcd.init();
  lcd.backlight();

  // set acceleration in steps/sec^2
  stepper1.setAcceleration(acceleration);
  stepper1.setMaxSpeed(maxSpeed);

  stepper2.setAcceleration(acceleration);
  stepper2.setMaxSpeed(maxSpeed);

  pinMode(enablePin,OUTPUT);
  digitalWrite(enablePin,LOW);
}

void loop()
{
  valueX = getControle(analogRead(potiX));
  if (valueX != holdX) {
    holdX = valueX;
    // lcdOut(0, 0, 'x', holdX, 8);
    stepper1.setSpeed(valueX * speedInterval);
  }
  stepper1.runSpeed();

  valueY = getControle(analogRead(potiY));
  if (valueY != holdY) {
    holdY = valueY;
    // lcdOut(0, 1, 'y', holdY, 8);
    stepper2.setSpeed(valueY * speedInterval);
  }
  stepper2.runSpeed();

  valueF = getControle(analogRead(potiF));
  if (valueF != holdF) {
    holdF = valueF;
    lcdOut(8, 0, 'F', holdF, 8);
  }

}

int getControle(int potVal) {
  int medVal = potVal - 511;
  int absVal = (abs(medVal)-16)/16;
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