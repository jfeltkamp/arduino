#include <AccelStepper.h>
#define motorInterfaceType 1
AccelStepper stepper1(motorInterfaceType, 2, 5);  //STEP-Pin, DIR-Pin
AccelStepper stepper2(motorInterfaceType, 3, 6);  //STEP-Pin, DIR-Pin

const int enPinX = 8;

void setup() {
  stepper1.setMaxSpeed(800);  // Maximale Geschwindigkeit
  stepper1.setAcceleration(500);  // Beschleunigung Schritte pro sek.^2
  stepper2.setMaxSpeed(800);  // Maximale Geschwindigkeit
  stepper2.setAcceleration(500);  // Beschleunigung Schritte pro sek.^2

  pinMode(enPinX,OUTPUT);
  digitalWrite(enPinX,LOW);
}

void loop() {
  stepper1.moveTo(2400);  // Zielposition
  stepper1.runToPosition();
  delay(1000);
  stepper1.moveTo(0);  // Anfangsposition
  stepper1.runToPosition();
  delay(1000);

  stepper2.moveTo(2400);  // Zielposition
  stepper2.runToPosition();
  delay(1000);
  stepper2.moveTo(0);  // Anfangsposition
  stepper2.runToPosition();
  delay(1000);
}