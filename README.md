# InteractivityFinalP


## Enbaling Web Bluetooth
Web Bluetooth is still experimental but is available in Chrome 45+ as an experimental feature. It looks like the plan is to integrate the spec into browsers in the near future. For now (April 2018) here are the steps for enablinb web bluetooth support:

(If you haven't, install Chrome and open a new window)
1. Enable experimental web platform features.
- go to: chrome://flags
- find "Experimental Web Platform Features"
- select "enable" (It will prompt you to restart Chrome)
2. Go to this webpage: https://whatwebcando.today/bluetooth.html to check that everything the bluetooth feature is now enabled. 

3. Web Bluetooth can only be run in certain contexts (localhost works, file:// does not)
You need to set up a simple http server in the project root directory to serve files on localhost. See https://stackoverflow.com/questions/38497334/how-to-run-html-file-on-localhost and pick whatever is most convenient for you.