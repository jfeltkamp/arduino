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

// control
const int stepSize = 40;
const int steeringTolerance = 12;

// constants
const int acceleration = 500;
const int maxSpeed = 930;
const int speedInterval = floor(maxSpeed / stepSize);
const long stepsPerRound = 80000;

// variables
int valueF = 0;
int holdF = 1;

int valueX = 0;
int holdX = 1;
float speedX = 0.0;
bool updatedX = false;

int valueY = 0;
int holdY = 1;
float speedY = 0.0;
bool updatedY = false;

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

  // Azimuth axis.
  valueX = getControle(analogRead(potiX), holdX);
  if (valueX != holdX) {
    holdX = valueX;
    stepper2.setSpeed(valueX * -1 * speedInterval);
    updatedX = true;
  }
  stepper2.runSpeed();

  if ((valueX == 0) && updatedX) {
    long posX = stepper2.currentPosition();
    const String& dir = getAzimuthDirection(posX);
    lcdOut(0, 0, 'H', dir, 12);
    updatedX = false;
  }

  // Altitude axis.
  valueY = getControle(analogRead(potiY), holdY);
  if (valueY != holdY) {
    holdY = valueY;
    stepper1.setSpeed(valueY * -1 * speedInterval);
    updatedY = true;
  }
  stepper1.runSpeed();

  if ((valueY == 0) && updatedY) {
    int posY = stepper1.currentPosition();
    const String& dir = getAltitudeDirection(posY);
    lcdOut(0, 1, 'V', dir, 9);
    updatedY = false;
  }

  valueF = getControle(analogRead(potiF), holdF);
  if (valueF != holdF) {
    holdF = valueF;
    String focus = String(holdF);
    lcdOut(11, 1, 'F', focus, 5);
  }
}

/**
 * Get direction from step count.
 */
String getAzimuthDirection(long steps) {
  long modi = steps % stepsPerRound;
  if (modi < 0) {
    modi = stepsPerRound + modi;
  }
  float result = 360.0 * (float)modi / (float)stepsPerRound;

  String resStr = String(result, 2);
  resStr.concat('"');
  resStr.concat(' ');

  String arr[17];
  arr[0] = "N";
  arr[1] = "NNE";
  arr[2] = "NE";
  arr[3] = "ENE";
  arr[4] = "E";
  arr[5] = "ESE";
  arr[6] = "SE";
  arr[7] = "SSE";
  arr[8] = "S";
  arr[9] = "SSW";
  arr[10] = "SW";
  arr[11] = "WSW";
  arr[12] = "W";
  arr[13] = "WNW";
  arr[14] = "NW";
  arr[15] = "NNW";
  arr[16] = "N";
  float degNom = result + 11.25;
  int index = (float)degNom / 22.5;
  resStr.concat(arr[index]);
  return resStr;
}

/**
 * Get direction from step count.
 */
String getAltitudeDirection(long steps) {
  long modi = steps % stepsPerRound;
  char dir = 'N';
  float result = 360.0 * (float)modi / (float)stepsPerRound;

  String resStr = String(result, 2);
  resStr.concat('"');
  return resStr;
}


/**
 *
 */
int getControle(int analogVal, int currentLevel) {
  int centeredVal = analogVal - 511;
  int absCenteredVal = abs(centeredVal);
  int absLevel = floor(absCenteredVal / stepSize);
  int remainder = absCenteredVal % (absLevel * stepSize);
  if (absLevel < currentLevel) {
    if (remainder > (stepSize - steeringTolerance)) {
      absLevel = absLevel + 1;
    }
  }

  if (centeredVal < 0) {
    absLevel = -absLevel;
  }
  return absLevel;
}

void lcdOut(int x, int y, char c, const String& v, int space) {
  lcd.setCursor(x,y);
  for (int blank = 0; blank < space; blank++) {
    lcd.print(" ");
  }
  lcd.setCursor(x,y);
  lcd.print(c);
  lcd.print(" ");
  lcd.print(v);
}