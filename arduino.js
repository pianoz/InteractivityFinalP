var SerialPort = require("serialport").SerialPort;
var serialport = new SerialPort("/dev/tty.usbmodem1421");
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(data[0]);
  });
});

/*

CODE BELOW IS DESIGNED TO GO IN THE ARDUINO. It is documented here:http://danialk.github.io/blog/2014/04/12/arduino-and-nodejs-communication-with-serial-ports/
it is designed to work with a button but the control remapping shouldn't be too hard. after this code is put on the arduno, run this program by
typing $ node arduino.js into the terminal and we should start getting output. After that all that needs to be done is for the this to be hooked
up to the webpage itself.

// digital pin 2 has a pushbutton attached to it.
int pushButton = 2;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  // make the pushbutton's pin an input:
  pinMode(pushButton, INPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input pin:
  int buttonState = digitalRead(pushButton);
  // print out the state of the button into the serial port:
  if(buttonState == HIGH){
    Serial.write(1);
  }else{
    Serial.write(0);
  }

  // delay in between reads for stability
  delay(100);
}

*/
