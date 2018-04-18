# InteractivityFinalP

A live demo of our project (in progress) is available here: https://pianoz.github.io/InteractivityFinalP/

## Web Bluetooth Support
Web Bluetooth is still experimental but is available in Chrome 45+ as an experimental feature. For now (April 2018) here are the steps for enabling web bluetooth support on Chrome:

(If you haven't, install Chrome and open a new window)
1. Enable experimental web platform features.
    - go to: chrome://flags
    - find "Experimental Web Platform Features"
    - select "enable" (It will prompt you to restart Chrome, you should do so.)
2. Go to this webpage: https://whatwebcando.today/bluetooth.html to check that the bluetooth feature is now enabled. 

## Additional Setup for Development Contexts
Web Bluetooth can only be run in certain contexts (localhost works, file:// does not)
You need to set up a simple http server in the project root directory to serve files on localhost. See https://stackoverflow.com/questions/38497334/how-to-run-html-file-on-localhost and pick whatever is most convenient for you.
