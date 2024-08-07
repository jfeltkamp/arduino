#include <Wire.h>
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
  
  unsigned long current_time = millis();
  if  (current_time >= last_action + interval) {
    last_action = current_time;
    temperature = random(5,25);
    Serial.println(String(temperature));
  }
  
  
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    if (message != state) {
      state = message;
      sec_str = String(temperature);
      lcdOut(0, 0, message + " " + temperature, 16);
    }
    
  }
}


void lcdOut(int x, int y, const String& v, int space) {
  lcd.setCursor(x,y);
  for (int blank = 0; blank < space; blank++) {
    lcd.print(" ");
  }
  lcd.setCursor(x,y);
  lcd.print(v);
}
