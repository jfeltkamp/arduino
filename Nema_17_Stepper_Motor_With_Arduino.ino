#include <AccelStepper.h>
#define motorInterfaceType 1
AccelStepper stepper(motorInterfaceType, 5, 2);  //STEP-Pin, DIR-Pin

const int enPinX = 8;

void setup() {
  stepper.setMaxSpeed(500);  // Maximale Geschwindigkeit
  stepper.setAcceleration(100);  // Beschleunigung Schritte pro sek.^2

  pinMode(enPinX,OUTPUT);
  digitalWrite(enPinX,LOW);
}

void loop() {
  stepper.moveTo(1000);  // Zielposition
  stepper.runToPosition();
  delay(1000);
  stepper.moveTo(0);  // Anfangsposition
  stepper.runToPosition();
  delay(1000);
}