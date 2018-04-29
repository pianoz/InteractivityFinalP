/******************************************************************************
Force_Sensitive_Resistor_Example.ino
Example sketch for SparkFun's force sensitive resistors
  (https://www.sparkfun.com/products/9375)
Jim Lindblom @ SparkFun Electronics
April 28, 2016

Create a voltage divider circuit combining an FSR with a 3.3k resistor.
- The resistor should connect from A0 to GND.
- The FSR should connect from A0 to 3.3V
As the resistance of the FSR decreases (meaning an increase in pressure), the
voltage at A0 should increase.

Development environment specifics:
Arduino 1.6.7
******************************************************************************/
const int FSR_PIN_MIDDLE = A0; // Pin connected to FSR/resistor divider
const int FSR_PIN_INDEX = A1;
const int FSR_PIN_THUMB = A2;

// Measure the voltage at 5V and resistance of your 3.3k resistor, and enter
// their value's below:
const float VCC = 4.98; // Measured voltage of Ardunio 5V line
const float R_DIV = 3230.0; // Measured resistance of 3.3k resistor

void setup() 
{
  Serial.begin(9600);
  pinMode(FSR_PIN_MIDDLE, INPUT);
  pinMode(FSR_PIN_INDEX, INPUT);
  pinMode(FSR_PIN_THUMB, INPUT);
}

void loop() 
{
  int fsrADC1 = analogRead(FSR_PIN_MIDDLE);
  int fsrADC2 = analogRead(FSR_PIN_INDEX);
  int fsrADC3 = analogRead(FSR_PIN_THUMB);
  // If the FSR has no pressure, the resistance will be
  // near infinite. So the voltage should be near 0.
  if (fsrADC1 != 0 | fsrADC2 != 0 | fsrADC3 != 0) // If the analog reading is non-zero
  {
    // Use ADC reading to calculate voltage:
    float fsrV1 = fsrADC1 * VCC / 1023.0;
    float fsrV2 = fsrADC2 * VCC / 1023.0;
    float fsrV3 = fsrADC3 * VCC / 1023.0;
    // Use voltage and static resistor value to 
    // calculate FSR resistance:
    float fsrR1 = R_DIV * (VCC / fsrV1 - 1.0);
    float fsrR2 = R_DIV * (VCC / fsrV2 - 1.0);
    float fsrR3 = R_DIV * (VCC / fsrV3 - 1.0);
    //Serial.println("Resistance1: " + String(fsrR1) + " ohms");
    //Serial.println("Resistance2: " + String(fsrR2) + " ohms");
    //Serial.println("Resistance3: " + String(fsrR3) + " ohms");
    // Guesstimate force based on slopes in figure 3 of
    // FSR datasheet:
    float force1;
    float force2;
    float force3;
    float fsrG1 = 1.0 / fsrR1; // Calculate conductance
    float fsrG2 = 1.0 / fsrR2; // Calculate conductance
    float fsrG3 = 1.0 / fsrR3; // Calculate conductance
    // Break parabolic curve down into two linear slopes:
    if (fsrR1 <= 600 | fsrR2 <= 600 | fsrR3 <= 600) {
      force1 = (fsrG1 - 0.00075) / 0.00000032639;
      force2 = (fsrG2 - 0.00075) / 0.00000032639;
      force3 = (fsrG3 - 0.00075) / 0.00000032639;}
      
      
    else{
      force1 =  fsrG1 / 0.000000642857;
      force2 =  fsrG2 / 0.000000642857;
      force3 =  fsrG3 / 0.000000642857;}
      
    Serial.println("Force1: " + String(force1) + " g");
    Serial.println();
    Serial.println("Force2: " + String(force2) + " g");
    Serial.println();
    Serial.println("Force3: " + String(force3) + " g");
    Serial.println();
    delay(500);
  //else
  //{
    // No pressure detected
  //}

  }
}


