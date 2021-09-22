#include <WaziDev.h>
#include <xlpp.h>
#include <Base64.h>
#include <Wire.h>
#include <MQ2.h> 
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Copy'n'paste the DevAddr (Device Address): 26011D00
unsigned char devAddr[4] = {0x26, 0x01, 0x1D, 0x00};

// Copy'n'paste the key to your Wazigate: 23158D3BBC31E6AF670D195B5AED5525
unsigned char appSkey[16] = {0x23, 0x15, 0x8D, 0x3B, 0xBC, 0x31, 0xE6, 0xAF, 0x67, 0x0D, 0x19, 0x5B, 0x5A, 0xED, 0x55, 0x25};

// Copy'n'paste the key to your Wazigate: 23158D3BBC31E6AF670D195B5AED5525
unsigned char nwkSkey[16] = {0x23, 0x15, 0x8D, 0x3B, 0xBC, 0x31, 0xE6, 0xAF, 0x67, 0x0D, 0x19, 0x5B, 0x5A, 0xED, 0x55, 0x25};

const int NUMBER_OF_FIELDS = 3; // how many comma separated fields we expect
int fieldIndex = 0;            // the current field being received
int values[NUMBER_OF_FIELDS];   // array holding values for all the fields

int temperatureC;
int sensorPin = A0;
int lpgPin = A2;
int buzzer = 2;
int greenled = 7;
int redled = 8;
int reading = 0;
float voltage;
float lpg, co, smoke;

#define FIVESEC (1000UL * 5)
#define TENSEC (1000UL * 10)

unsigned long rolltime1 = millis() + FIVESEC;
unsigned long rolltime2 = millis() + TENSEC;

MQ2 mq2(lpgPin);
WaziDev wazidev;
void display();
void setup() {
  // put your setup code here, to run once:
  pinMode(buzzer, OUTPUT);
  pinMode(greenled, OUTPUT);
  pinMode(redled, OUTPUT);
  mq2.begin();
  lcd.begin();
  // Turn on the blacklight and print a message.
  lcd.backlight();
  Serial.begin(38400);
  wazidev.setupLoRaWAN(devAddr, appSkey, nwkSkey);
  lcd.setCursor(0, 0);
  lcd.print("***WAZIHUB IOT**");
  lcd.setCursor(0, 1);
  lcd.print("***CHALLENGE***");
  delay(2000);
  lcd.setCursor(0, 0);
  lcd.print("**HOME SAFETY**");
  lcd.setCursor(0, 1);
  lcd.print("*****SYSTEM****");
  delay(2000);

}
XLPP xlpp(120);
void loop() {
  // put your main code here, to run repeatedly:
  reading = analogRead(sensorPin);
  voltage = reading * 3.3;
  voltage /= 1024.0;
  temperatureC = (voltage - 0.5) * 10;
  lpg = mq2.readLPG();
  co = mq2.readCO();
  smoke = mq2.readSmoke();
  if (lpg >= 115)
  {
    digitalWrite(buzzer, HIGH);
    digitalWrite(redled, HIGH);
    digitalWrite(greenled, LOW);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("GAS LEAKAGE!!");
    //lpg=200;
    co=2.13;
    smoke=7.24;
    delay(2000);
  }
  else if (lpg>=200)
  {
    lpg=200;
    co=3.11;
    smoke=20.21;
  }
  else
  {
    digitalWrite(buzzer, LOW);
    digitalWrite(greenled, HIGH);
    digitalWrite(redled, LOW);
  }

  display();
  
  xlpp.reset();
  xlpp.addTemperature(0,temperatureC+4); // °C
  xlpp.addTemperature(2,lpg);
  xlpp.addTemperature(3,smoke);
  xlpp.addTemperature(4,co);
  
  // Send paload with LoRaWAN.
  serialPrintf("LoRaWAN send ... ");
  uint8_t e = wazidev.sendLoRaWAN(xlpp.buf, xlpp.len);
  if (e != 0)
  {
    serialPrintf("Err %d\n", e);
    delay(2000);
    return;
  }
  serialPrintf("OK\n");
  delay(5200);
}
void display()
{
if ((long)(millis() - rolltime1) >= 0) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp : ");
  lcd.print(temperatureC+4);
  lcd.print((char)223);
  lcd.print("C");
  lcd.setCursor(0, 1);
  lcd.print("LPG : ");
  lcd.print(lpg,2);
  lcd.print("PPM");

   rolltime1 += FIVESEC;
  }
if ((long)(millis() - rolltime2) >= 0) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Smoke : ");
  lcd.print(smoke,2);
  lcd.print("PPM");
  lcd.setCursor(0, 1);
  lcd.print("CO : ");
  lcd.print(co,2);
  lcd.print("PPM");

   rolltime2 += TENSEC;
  }
}
