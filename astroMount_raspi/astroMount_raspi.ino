#include <LiquidCrystal_I2C.h>
#include <AccelStepper.h>

#define motorInterfaceType 1
const byte focusInterfaceType = 8;

AccelStepper stepperX(motorInterfaceType, 3, 6);  //STEP-Pin, DIR-Pin
AccelStepper stepperY(motorInterfaceType, 2, 5);  //STEP-Pin, DIR-Pin
AccelStepper stepperF(focusInterfaceType, 4, 12, 7, 13); // Pins IN1-IN3-IN2-IN4

LiquidCrystal_I2C lcd(0x27, 16, 2);

const int enablePin = 8;

// constants
const int acceleration = 100;
const int axisSpeed = 800;
const int focusSpeed = 500;

String awaited_response = "";

void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  while (!Serial) {}

  // set acceleration in steps/sec^2
  stepperX.setAcceleration(acceleration);
  stepperX.setMaxSpeed(axisSpeed);

  stepperY.setAcceleration(acceleration);
  stepperY.setMaxSpeed(axisSpeed);

  stepperF.setAcceleration(acceleration);
  stepperF.setMaxSpeed(focusSpeed);

  pinMode(enablePin, OUTPUT);
  digitalWrite(enablePin, LOW);

  lcdOut(4, 0, "Obelix", 12);
  lcdOut(6, 1, "1.0", 13);
}

/* Write message to LCD display. */
void lcdOut(int x, int y, const String& v, int space) {
  lcd.setCursor(x,y);
  for (int blank = 0; blank < space; blank++) {
    lcd.print(" ");
  }
  lcd.setCursor(x,y);
  lcd.print(v);
}

/* String splitter */
String getStringPartial(String data, char separator, int index) {
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;
  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }
  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

/* Check if string is command. */
bool isCommand(String data) {
    return getStringPartial(data, '_', 0) == "cmd";
}

/* Get steps 1-directional */
int getStepsOneDirect(String value, String cmd) {
  int steps = value.toInt();
  if (steps <= 0) {
      Serial.println("ERROR: Command '" + cmd + "' is 1-directional. Steps must be greater then 0, but is: " + value);
      return 0;
  } else {
    return steps;
  }
}

/* Get steps 1-directional */
int getStepsBiDirect(String value, String cmd, int min, int max) {
  int steps = value.toInt();
  if (steps<min || steps>max) {
      Serial.println("WARN: Command '" + cmd + "' min/max value. Steps must be >= "+ String(min) +" and <= "+ String(max) +", but is: " + value);
      return 0;
  } else {
    return steps;
  }
}

bool setAwaitedResponse(String await, String dir) {
    if (await == "await") {
        if (awaited_response == "") {
            awaited_response = dir;
        } else {
          // Another response is already awaited.
          return false;
        }
    }
    return true;
}

void resolveResponse() {
    if ((awaited_response == "dir_x" && stepperX.distanceToGo() == 0) || (awaited_response == "dir_y" && stepperY.distanceToGo() == 0) || ((awaited_response == "dir_xy") && (stepperX.distanceToGo() == 0) && (stepperY.distanceToGo() == 0)) || (awaited_response == "focus" && stepperF.distanceToGo() == 0)) {
        String extend = "";
        if ((awaited_response == "dir_x") || (awaited_response == "dir_xy")) {
            extend = "_x:" + stepperX.currentPosition();
        }
        if ((awaited_response == "dir_y") || (awaited_response == "dir_xy")) {
            extend = extend + "_y:" + stepperY.currentPosition();
        }
        else {
            extend = extend + "_f:" + stepperF.currentPosition();
        }
        awaited_response = "";
        Serial.println("success" + extend);
    }
}

/* CMD LCD */
void cmd_lcd(String value, String pos) {
  int posx = getStringPartial(pos, '_', 0).toInt();
  int posy = getStringPartial(pos, '_', 1).toInt();
  lcdOut(posx, posy, value, 16);
  Serial.println("success");
}

/* CMD up */
void cmd_up(String value, String await) {
    int steps = getStepsOneDirect(value, "cmd_up");
    if (steps > 0 && setAwaitedResponse(await, "dir_y")) {
        stepperY.move(steps);
    }
}

/* CMD down */
void cmd_down(String value, String await) {
    int steps = getStepsOneDirect(value, "cmd_down");
    if (steps > 0 && setAwaitedResponse(await, "dir_y")) {
        stepperY.move(-steps);
    }
}

/* CMD left */
void cmd_left(String value, String await) {
    int steps = getStepsOneDirect(value, "cmd_left");
    if (steps > 0 && setAwaitedResponse(await, "dir_x")) {
        stepperX.move(-steps);
    }
}

/* CMD right */
void cmd_right(String value, String await) {
    int steps = getStepsOneDirect(value, "cmd_right");
    if (steps > 0 && setAwaitedResponse(await, "dir_x")) {
        stepperX.move(steps);
    }
}

/* CMD goto */
void cmd_goto(String value, String await) {
    if (setAwaitedResponse(await, "dir_xy")) {
        int steps_x = getStringPartial(value, ',', 0).toInt();
        stepperX.moveTo(steps_x);
        int steps_y = getStringPartial(value, ',', 1).toInt();
        stepperY.moveTo(steps_y);
    }
}

/* CMD right */
void cmd_stop(String value) {
    if (value == "x") {
        stepperX.stop();
    }
    else if (value == "y") {
        stepperY.stop();
    }
    else if (value == "f") {
        stepperF.stop();
    }
}

/* CMD focus */
void cmd_focus(String value, String await) {
    int steps = getStepsBiDirect(value, "cmd_focus", -2000, 2000);
    if (steps != 0 && setAwaitedResponse(await, "focus")) {
        stepperF.move(steps);
    }
}

/* Command interpreter */
void cmd_interpreter(const String& cmd_raw) {
    if (isCommand(cmd_raw)) {
        String command = getStringPartial(cmd_raw, ':', 0);
        String params = getStringPartial(cmd_raw, ':', 1);
        String options = getStringPartial(cmd_raw, ':', 2);
        if (command == "cmd_goto") {
            cmd_goto(params, options);
        }
        else if (command == "cmd_up") {
            cmd_up(params, options);
        }
        else if (command == "cmd_down") {
            cmd_down(params, options);
        }
        else if (command == "cmd_left") {
            cmd_left(params, options);
        }
        else if (command == "cmd_right") {
            cmd_right(params, options);
        }
        else if (command == "cmd_stop") {
            cmd_stop(params);
        }
        else if (command == "cmd_focus") {
            cmd_focus(params, options);
        }
        else if (command == "cmd_lcd") {
            cmd_lcd(params, options);
        }
    }
}

void loop() {
    if (Serial.available() > 0) {
        String message = Serial.readStringUntil('\n');
        cmd_interpreter(message);
    }
    stepperX.run();
    stepperY.run();
    stepperF.run();

    resolveResponse();
}
