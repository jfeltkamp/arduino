#include <LiquidCrystal_I2C.h>
#include <AccelStepper.h>
#include <ArduinoJson.h>

#define motorInterfaceType 1

AccelStepper stepperX(motorInterfaceType, 3, 6); // STEP-Pin, DIR-Pin
AccelStepper stepperY(motorInterfaceType, 2, 5); // STEP-Pin, DIR-Pin
AccelStepper stepperF(motorInterfaceType, 4, 7); // STEP-Pin, DIR-Pin

LiquidCrystal_I2C lcd(0x27, 16, 2);

const int enablePin = 8;

// constants
const int acc = 1000;
// Axis steps per revolution.
const long spr = 80000;
// max position axis from 0 (absolute: plus or minus).
const long mpa = spr / 2;
long minpx = -mpa;
long maxpx = mpa;
// Speed axis.
const int va = 800;
// Min speed axis.
const int va1 = 100;
// Max speed axis.
const int va2 = 2000;

// Max position focus from 0 (absolute: plus or minus).
const long mpf = 5000;
// Speed focus.
const int vf = 500;
// Min speed focus.
const int vf1 = 200;
// Max speed focus.
const int vf2 = 800;

const int MODE_NEUTRAL = 0;
const int MODE_ANALOG = 1;
const int MODE_AUTO = 2;

const int DIR_X = 1;    // Stepper counts up clockwise => 1
const int DIR_Y = -1;   // Stepper counts up counter-clockwise => -1
const int DIR_F = 1;

// Process variables
bool debug = false;
String awaited_response = "";
bool busy = false;
int op_mode = MODE_NEUTRAL;
// Annalog mode.
int analog_x_speed = 0;
int analog_y_speed = 0;
int analog_f_speed = 0;
int curr_x_speed = 0;
int curr_y_speed = 0;
int curr_f_speed = 0;
unsigned long speed_last_update_t = 0;
int speed_steps_per_update = 2;
float speed_update_cycle = speed_steps_per_update * 1000 / acc;

void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  while (!Serial) {}

  // set acceleration in steps/sec^2
  stepperX.setAcceleration(acc);
  stepperX.setMaxSpeed(va);

  stepperY.setAcceleration(acc);
  stepperY.setMaxSpeed(va);

  stepperF.setAcceleration(acc);
  stepperF.setMaxSpeed(vf);

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
long getStepsOneDirect(String value, String cmd) {
  long steps = value.toInt();
  if (steps <= 0) {
      sendStatus("error", false);
      return 0;
  }
  return steps;
}

/* Get steps 1-directional */
long getMinMaxIntFromStr(String value, long min, long max) {
  long steps = value.toInt();
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
        sendStatus("error", false);
        return false;
    }
    else if (await == "await") {
        awaited_response = dir;
    }
    return true;
}

/* Send error message to controller. */
void sendError(String respStatus, String msg) {
    StaticJsonDocument<128> doc;
    doc["status"] = respStatus;
    doc["message"] = msg;
    // Serialize JSON to string and send by Serial.
    serializeJson(doc, Serial);
}

/* Send status to controller. */
void sendStatus(String respStatus, bool config) {
    // Create a JSON document
    StaticJsonDocument<128> doc;
    doc["status"] = respStatus;

    JsonObject data = doc.createNestedObject("data");
    data["x"] = stepperX.currentPosition();
    data["y"] = stepperY.currentPosition();
    data["f"] = stepperF.currentPosition();

    if (config) {
        data["acc"] = acc;
        data["spr"] = spr;

        data["mpa"] = mpa;
        data["minpx"] = minpx;
        data["maxpx"] = maxpx;
        data["va"] = va;
        data["va1"] = va1;
        data["va2"] = va2;

        data["mpf"] = mpf;
        data["vf"] = vf;
        data["vf1"] = vf1;
        data["vf2"] = vf2;

        data["dx"] = DIR_X;
        data["dy"] = DIR_Y;
        data["df"] = DIR_F;
    }

    // Serialize JSON to string and send by Serial.
    serializeJson(doc, Serial);
}

/* Check if stepper is running */
bool isRunning(AccelStepper stepper) {
    if (op_mode == MODE_ANALOG) {
        return round(stepper.speed()) != 0;
    }
    else if (op_mode == MODE_AUTO) {
        return stepper.isRunning();
    }
    return false;
}

/* Reset params to default to await next command. */
void resolveResponse() {
    if (busy && !isRunning(stepperX) && !isRunning(stepperY) && !isRunning(stepperF)) {
        stepperX.setMaxSpeed(va);
        stepperX.moveTo(stepperX.currentPosition());
        stepperX.setSpeed(0);

        stepperY.setMaxSpeed(va);
        stepperY.moveTo(stepperY.currentPosition());
        stepperY.setSpeed(0);

        stepperF.setMaxSpeed(vf);
        stepperF.moveTo(stepperF.currentPosition());
        stepperF.setSpeed(0);

        awaited_response = "";
        op_mode = MODE_NEUTRAL;
        busy = false;
        sendStatus("success", false);
    }
}

/* En-/disable steppers. */
void cmd_enable(String value) {
  if (value == "on") {
      digitalWrite(enablePin, LOW);
      sendStatus("Enabled motor drivers.", false);
  }
  else {
      digitalWrite(enablePin, HIGH);
      sendStatus("Disabled motor drivers.", false);
  }
}

/* Set home position. */
void cmd_set_home(String value) {
    long posx = getStringPartial(value, ',', 0).toInt();
    long posy = getStringPartial(value, ',', 1).toInt();
    long posf = getStringPartial(value, ',', 2).toInt();
    minpx = posx - mpa;
    maxpx = posx + mpa;
    stepperX.setCurrentPosition(posx);
    stepperY.setCurrentPosition(posy);
    stepperF.setCurrentPosition(posf);
    sendStatus("success", true);
}

/* CMD LCD */
void cmd_lcd(String value, String pos) {
    if (!debug) {
        long posx = getStringPartial(pos, '_', 0).toInt();
        long posy = getStringPartial(pos, '_', 1).toInt();
        lcdOut(posx, posy, value, 16);
    }
}

/* CMD up */
void cmd_up(String value, String await) {
    long steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_up");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "up")) {
        busy = true;
        stepperY.move(-steps * DIR_Y);
    }
}

/* CMD down */
void cmd_down(String value, String await) {
    long steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_down");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "dw")) {
        busy = true;
        stepperY.move(steps * DIR_Y);
    }
}

/* CMD left */
void cmd_left(String value, String await) {
    long steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_left");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "le")) {
        busy = true;
        stepperX.move(-steps * DIR_X);
    }
}

/* CMD right */
void cmd_right(String value, String await) {
    long steps = getStepsOneDirect(getStringPartial(value, ',', 0), "cmd_right");
    if (steps > 0 && setMode(MODE_AUTO) && setAwaitedResponse(await, "ri")) {
        busy = true;
        stepperX.move(steps * DIR_X);
    }
}

/* CMD focus */
void cmd_focus(String value, String await) {
    long steps = getMinMaxIntFromStr(getStringPartial(value, ',', 0), -mpf, mpf);
    if ((steps >= -mpf) && (steps != 0) && setMode(MODE_AUTO) && setAwaitedResponse(await, "fc")) {
        busy = true;
        stepperF.move(steps * DIR_F);
    }
}

/* CMD goto */
void cmd_goto(String value, String await) {
    if (setMode(MODE_AUTO) && setAwaitedResponse(await, "gt")) {
        // move X axis to.
        long target = getMinMaxIntFromStr(getStringPartial(value, ',', 0), minpx, maxpx);
        int speed = 0;
        if (target >= minpx) {
            speed = getMinMaxIntFromStr(getStringPartial(value, ',', 3), va1, va2);
            if (speed >= va1) {
                stepperX.setMaxSpeed(speed);
            }
            stepperX.moveTo(target);
            busy = true;
        }

        // move Y axis to.
        target = getMinMaxIntFromStr(getStringPartial(value, ',', 1), -mpa, mpa);
        if (target >= -mpa) {
            speed = getMinMaxIntFromStr(getStringPartial(value, ',', 4), va1, va2);
            if (speed >= va1) {
                stepperY.setMaxSpeed(speed);
            }
            stepperY.moveTo(target);
            busy = true;
        }

        // move focus to.
        target = getMinMaxIntFromStr(getStringPartial(value, ',', 2), -mpf, mpf);
        if (target >= -mpf) {
            speed = getMinMaxIntFromStr(getStringPartial(value, ',', 5), vf1, vf2);
            if (speed >= vf1) {
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
    else if (value == "danger") {
        stepperX.stop();
        stepperY.stop();
        stepperF.stop();
    }
}

/* CMD moxe x axis analog */
int cmd_axis(String value, int minSpeed, int maxSpeed) {
    int speed = getMinMaxIntFromStr(getStringPartial(value, ',', 0), -maxSpeed, maxSpeed);
    if ((speed >= -maxSpeed) && (abs(speed) >= minSpeed) && setMode(MODE_ANALOG)) {
        busy = true;
        return speed;
    }
    return 0;
}

/* Sets speed during analog run. */
void set_speed() {
    unsigned long izt = millis();
    if ((izt - speed_last_update_t) > speed_update_cycle) {
        speed_last_update_t = izt;
        // X axis
        if (analog_x_speed >= (curr_x_speed + speed_steps_per_update)) {
            curr_x_speed = curr_x_speed + speed_steps_per_update;
        }
        else if (analog_x_speed <= (curr_x_speed - speed_steps_per_update)) {
            curr_x_speed = curr_x_speed - speed_steps_per_update;
        }
        else if (analog_x_speed != curr_x_speed) {
            curr_x_speed = analog_x_speed;
        }
        // Y axis
        if (analog_y_speed > (curr_y_speed + speed_steps_per_update)) {
            curr_y_speed = curr_y_speed + speed_steps_per_update;
        }
        else if (analog_y_speed < (curr_y_speed - speed_steps_per_update)) {
            curr_y_speed = curr_y_speed - speed_steps_per_update;
        }
        else if (analog_y_speed != curr_y_speed) {
            curr_y_speed = analog_y_speed;
        }
        // FOCUS (Z axis)
        if (analog_f_speed > (curr_f_speed + speed_steps_per_update)) {
            curr_f_speed = curr_f_speed + speed_steps_per_update;
        }
        else if (analog_f_speed < (curr_f_speed - speed_steps_per_update)) {
            curr_f_speed = curr_f_speed - speed_steps_per_update;
        }
        else if (analog_f_speed != curr_f_speed) {
            curr_f_speed = analog_f_speed;
        }
    }
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
        else if (command == "ard_lcd") {
            cmd_lcd(params, options);
        }
        else if (command == "ard_home") {
            cmd_set_home(params);
        }
        if (op_mode != MODE_ANALOG) {
            if (command == "ard_goto") {
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
            else if (command == "ard_focus") {
                cmd_focus(params, options);
            }
        }
        if (op_mode != MODE_AUTO) {
            if (command == "ard_x") {
                analog_x_speed = cmd_axis(params, va1, va2);
            }
            else if (command == "ard_y") {
                analog_y_speed = cmd_axis(params, va1, va2);
            }
            else if (command == "ard_f") {
                analog_f_speed = cmd_axis(params, vf1, vf2);
            }
        }
    }
}

void debugTimer() {
    static const unsigned long REFRESH_INTERVAL = 1000; // ms
    static unsigned long lastRefreshTime = 0;

    if(millis() - lastRefreshTime >= REFRESH_INTERVAL) {
        lastRefreshTime += REFRESH_INTERVAL;
        debugDisplay();
    }
}

void debugDisplay() {
    String line1 = "";
    // enabled (3 char)
    if (!digitalRead(enablePin)) { line1 += "eY "; } else { line1 += "eN "; }
    // busy (3 char)
    if (busy) { line1 += "bY "; } else { line1 += "bN "; }
    // mode (2 char)
    if (op_mode == MODE_ANALOG){line1 += "M ";} else if (op_mode == MODE_AUTO){line1 += "A ";} else if (op_mode == MODE_NEUTRAL){line1 += "N ";} else {line1 += "? ";}
    // awaited response (3 char)
    if (awaited_response == ""){line1 += "-- ";} else {line1 += awaited_response + " ";}
    // Steppers running XYF (4 char)
    if (isRunning(stepperX)) {line1 += "Y";} else {line1 += "N";}
    if (isRunning(stepperY)) {line1 += "Y";} else {line1 += "N";}
    if (isRunning(stepperF)) {line1 += "Y ";} else {line1 += "N ";}
    lcdOut(0, 0, line1, 16);
    String line2 = "";
    line2 += "v: " + int(trunc(stepperX.speed()));
    char dtg[40];
    sprintf(dtg,"d: %lu", stepperX.distanceToGo());
    line2 += dtg;
    lcdOut(0, 1, line2, 16);
}

void loop() {
    if (debug) {
        debugTimer();
    }
    if (Serial.available() > 0) {
        String message = Serial.readStringUntil('\n');
        cmd_interpreter(message);
    }
    if (op_mode == MODE_ANALOG) {
        set_speed();
        stepperX.setSpeed(curr_x_speed);
        stepperX.runSpeed();
        stepperY.setSpeed(curr_y_speed);
        stepperY.runSpeed();
        stepperF.setSpeed(curr_f_speed);
        stepperF.runSpeed();
    }
    if (op_mode == MODE_AUTO) {
        stepperX.run();
        stepperY.run();
        stepperF.run();
    }
    resolveResponse();
}
