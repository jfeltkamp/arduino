#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

String sec_str = "0";
int temperature = random(5,25);
String state = "on";

unsigned long last_action = millis();
unsigned long interval = 1000;

void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  while (!Serial) {}
}

void loop() {

  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    cmd_interpreter(message);
  }

}

void cmd_interpreter(const String& cmd_raw) {
    if (isCommand(cmd_raw)) {
        String command = getStringPartial(cmd_raw, ':', 0);
        String param = getStringPartial(cmd_raw, ':', 1);
        if (command == "cmd_up") {
            cmd_up(param.toInt());
        }
        if (command == "cmd_down") {
            cmd_down(param.toInt());
        }
        if (command == "cmd_left") {
            cmd_left(param.toInt());
        }
        if (command == "cmd_right") {
            cmd_right(param.toInt());
        }
        delay(1000);
        Serial.println("success");
    }
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

/* CMD up */
void cmd_up(int value) {
    if (value) {
        lcdOut(0,0, "up " + String(value), 16);
    }
}
/* CMD down */
void cmd_down(int value) {
    if (value) {
        lcdOut(0,0, "down " + String(value), 16);
    }
}
/* CMD left */
void cmd_left(int value) {
    if (value) {
        lcdOut(0,0, "left " + String(value), 16);
    }
}
/* CMD right */
void cmd_right(int value) {
    if (value) {
        lcdOut(0,0, "right " + String(value), 16);
    }
}
