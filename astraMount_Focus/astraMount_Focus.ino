#include <AccelStepper.h>

const byte Fullstep = 4;
const byte Halfstep = 8;
const short fullRevolution = 2048;
const float SteppDegree = 12; // Halfstep 11.32 - Fullstep 5.66

// Pins IN1-IN3-IN2-IN4
AccelStepper stepperF(Halfstep, 4,12,7,13);

const int potiF = A1;
const int enablePin = 8;

// control
const int stepSize = 40;
const int steeringTolerance = 12;

// constants
const int acceleration = 500;
const int maxSpeed = 1000;
const int speedInterval = floor(maxSpeed / stepSize);
const long stepsPerRound = 80000;

// variables
int valueF = 0;
int holdF = 1;


void setup() {
  Serial.begin(9600);
  stepperF.setAcceleration(acceleration);
  stepperF.setMaxSpeed(1000);
  stepperF.setSpeed(800);
}

void loop() {
  valueF = getControle(analogRead(potiF), holdF);
  if (valueF != holdF) {
    holdF = valueF;
    Serial.println(valueF);
    stepperF.setSpeed(valueF * -1 * speedInterval);
  }
   stepperF.runSpeed();
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
