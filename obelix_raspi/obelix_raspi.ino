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
const int acceleration = 1000;
const int axisMaxMove = 20000;

const int axisMinSpeed = 100;
const int axisMaxSpeed = 2000;
const int axisSpeed = 800;

const int focusMaxMove = 5000;
const int focusMinSpeed = 100;
const int focusMaxSpeed = 2000;
const int focusSpeed = 500;

const int MODE_NEUTRAL = 0;
const int MODE_ANALOG = 1;
const int MODE_AUTO = 2;

// Process variables
String awaited_response = "";
bool busy = false;
int op_mode = MODE_NEUTRAL;
int analog_x_speed = 0;
int analog_y_speed = 0;
int analog_f_speed = 0;

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
  // By default the steppers are disabled and started by command.
  digitalWrite(enablePin, HIGH);

  lcdOut(4, 0, "Obelix", 12);
  lcdOut(6, 1, "1.0", 13);
}

bool setMode(int mode) {
    if (op_mode == MODE_NEUTRAL) {
        op_mode = mode;
    }
    if (op_mode == mode) {
        return true;
    }
    return false;
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
    return getStringPartial(data, '_', 0) == "ard";
}

/* Get steps 1-directional */
int getStepsOneDirect(String value, String cmd) {
  int steps = value.toInt();
  if (steps <= 0) {
      Serial.println("ERROR: Param for '" + cmd + "' is 1-directional. Steps must be greater then 0, but is: " + value);
      return 0;
  }
  return steps;
}

/* Get steps 1-directional */
int getMinMaxIntFromStr(String value, int min, int max) {
  int steps = value.toInt();
  if ((String(steps) != value) || (min >= max)) {
    // Error value.
    return min - 1;
  }
  if (steps < min) {
    return min;
  }
  else if (steps > max) {
    return max;
  }
  return steps;
}

bool setAwaitedResponse(String await, String dir) {
    if (awaited_response != "") {
        // Another response is already awaited.
        Serial.println("error");
        return false;
    }
    else if (await == "await") {
        awaited_response = dir;
    }
    return true;
}

void resolveResponse() {
    if (busy && !stepperX.isRunning() && !stepperY.isRunning() && !stepperF.isRunning()) {
        stepperX.setMaxSpeed(axisSpeed);
        stepperY.setMaxSpeed(axisSpeed);
        stepperF.setMaxSpeed(focusSpeed);
        String resp = "success";
        resp = resp + "_x:" + stepperX.currentPosition();
        resp = resp + "_y:" + stepperY.currentPosition();
        resp = resp + "_f:" + stepperF.currentPosition();
        Serial.println(resp);
        awaited_response = "";
        op_mode = "";
        busy = false;
    }
}

/* En-/disable steppers. */
void cmd_enable(String value) {
  if (value == "on") {
      digitalWrite(enablePin, LOW);
  }
  else {
      digitalWrite(enablePin, HIGH);
  }
}

/* CMD LCD */
void cmd_lcd(String value, String pos) {
  int posx = getStringPartial(pos, '_', 0).toInt();
  int posy = getStringPartial(pos, '_', 1).toInt();
  lcdOut(posx, posy, value, 16);
}

/* CMD up */
void cmd_up(String value, String await) {
    int steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_up");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "up")) {
        busy = true;
        stepperY.move(steps);
    }
}

/* CMD down */
void cmd_down(String value, String await) {
    int steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_down");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "down")) {
        busy = true;
        stepperY.move(-steps);
    }
}

/* CMD left */
void cmd_left(String value, String await) {
    int steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_left");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "left")) {
        busy = true;
        stepperX.move(-steps);
    }
}

/* CMD right */
void cmd_right(String value, String await) {
    int steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_right");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "right")) {
        busy = true;
        stepperX.move(steps);
    }
}

/* CMD focus */
void cmd_focus(String value, String await) {
    int steps = getMinMaxIntFromStr(getStringPartial(value, ',', 0), -focusMaxMove, focusMaxMove);
    if ((steps >= -focusMaxMove) && (steps != 0) && setMode(MODE_AUTO) && setAwaitedResponse(await, "focus")) {
        busy = true;
        stepperF.move(steps);
    }
}

/* CMD goto */
void cmd_goto(String value, String await) {
    if (setMode(MODE_AUTO) && setAwaitedResponse(await, "goto")) {
        // move X axis to.
        int target = getMinMaxIntFromStr(getStringPartial(value, ',', 0), -axisMaxMove, axisMaxMove);
        int speed = 0;
        if (target >= -axisMaxMove) {
            speed = getMinMaxIntFromStr(getStringPartial(value, ',', 3), axisMinSpeed, axisMaxSpeed);
            if (speed >= axisMinSpeed) {
                stepperX.setMaxSpeed(speed);
            }
            stepperX.moveTo(target);
            busy = true;
        }

        // move Y axis to.
        target = getMinMaxIntFromStr(getStringPartial(value, ',', 1), -axisMaxMove, axisMaxMove);
        if (target >= -axisMaxMove) {
            speed = getMinMaxIntFromStr(getStringPartial(value, ',', 4), axisMinSpeed, axisMaxSpeed);
            if (speed >= axisMinSpeed) {
                stepperY.setMaxSpeed(speed);
            }
            stepperY.moveTo(target);
            busy = true;
        }

        // move focus to.
        target = getMinMaxIntFromStr(getStringPartial(value, ',', 2), -focusMaxMove, focusMaxMove);
        if (target >= -focusMaxMove) {
            speed = getMinMaxIntFromStr(getStringPartial(value, ',', 5), focusMinSpeed, focusMaxSpeed);
            if (speed >= focusMinSpeed) {
                stepperF.setMaxSpeed(speed);
            }
            stepperF.moveTo(target);
            busy = true;
        }
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

/* CMD moxe x axis analog */
int cmd_axis(String value, int minSpeed, int maxSpeed) {
    int speed = getMinMaxIntFromStr(getStringPartial(value, ',', 0), -maxSpeed, maxSpeed);
    if ((speed >= -maxSpeed) && (abs(speed) >= minSpeed) && setMode(MODE_ANALOG)) {
        return speed;
    }
    return 0;
}

/* Sets speed during analog run. */
void set_speed(AccelStepper stepper, int target_speed) {
    int curr_speed = round(stepper.speed());
    if (target_speed > curr_speed) {
        stepper.setSpeed(curr_speed + 1);
    }
    if (target_speed < curr_speed) {
        stepper.setSpeed(curr_speed - 1);
    }
    stepper.runSpeed();
}

/* Command interpreter */
void cmd_interpreter(const String& cmd_raw) {
    if (isCommand(cmd_raw)) {
        String command = getStringPartial(cmd_raw, ':', 0);
        String params = getStringPartial(cmd_raw, ':', 1);
        String options = getStringPartial(cmd_raw, ':', 2);
        if (command == "ard_enable") {
            cmd_enable(params);
        }
        else if (command == "ard_goto") {
            cmd_goto(params, options);
        }
        else if (command == "ard_up") {
            cmd_up(params, options);
        }
        else if (command == "ard_down") {
            cmd_down(params, options);
        }
        else if (command == "ard_left") {
            cmd_left(params, options);
        }
        else if (command == "ard_right") {
            cmd_right(params, options);
        }
        else if (command == "ard_stop") {
            cmd_stop(params);
        }
        else if (command == "ard_x") {
            analog_x_speed = cmd_axis(params, axisMinSpeed, axisMaxSpeed);
        }
        else if (command == "ard_y") {
            analog_y_speed = cmd_axis(params, axisMinSpeed, axisMaxSpeed);
        }
        else if (command == "ard_f") {
            analog_f_speed = cmd_axis(params, focusMinSpeed, focusMaxSpeed);
        }
        else if (command == "ard_focus") {
            cmd_focus(params, options);
        }
        else if (command == "ard_lcd") {
            cmd_lcd(params, options);
        }
    }
}

void loop() {
    if (Serial.available() > 0) {
        String message = Serial.readStringUntil('\n');
        cmd_interpreter(message);
    }

    if (op_mode == MODE_ANALOG) {
        set_speed(stepperX, analog_x_speed);
        set_speed(stepperY, analog_y_speed);
        set_speed(stepperF, analog_f_speed);
    }
    else {
        stepperX.run();
        stepperY.run();
        stepperF.run();
    }

    resolveResponse();
}
