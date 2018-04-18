
// Bluetooth code is copied from: https://googlechrome.github.io/samples/web-bluetooth/device-info-async-await.html
// Copyright 2018 Google Inc. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Add a global error event listener early on in the page load, to help ensure that browsers
// which don't support specific functionality still end up displaying a meaningful message.
window.addEventListener('error', function(error) {
if (ChromeSamples && ChromeSamples.setStatus) {
console.error(error);
ChromeSamples.setStatus(error.message + ' (Your browser may not support this feature.)');
error.preventDefault();
}
});

window.addEventListener('DOMContentLoaded', function() {
const searchParams = new URL(location).searchParams;
const inputs = Array.from(document.querySelectorAll('input[id]'));

inputs.forEach(input => {
  if (searchParams.has(input.id)) {
    if (input.type == 'checkbox') {
      input.checked = searchParams.get(input.id);
    } else {
      input.value = searchParams.get(input.id);
      input.blur();
    }
  }
  if (input.type == 'checkbox') {
    input.addEventListener('change', function(event) {
      const newSearchParams = new URL(location).searchParams;
      if (event.target.checked) {
        newSearchParams.set(input.id, event.target.checked);
      } else {
        newSearchParams.delete(input.id);
      }
      history.replaceState({}, '', Array.from(newSearchParams).length ?
          location.pathname + '?' + newSearchParams : location.pathname);
    });
  } else {
    input.addEventListener('input', function(event) {
      const newSearchParams = new URL(location).searchParams;
      if (event.target.value) {
        newSearchParams.set(input.id, event.target.value);
      } else {
        newSearchParams.delete(input.id);
      }
      history.replaceState({}, '', Array.from(newSearchParams).length ?
          location.pathname + '?' + newSearchParams : location.pathname);
    });
  }
});
});

var ChromeSamples = {
log: function() {
  var line = Array.prototype.slice.call(arguments).map(function(argument) {
    return typeof argument === 'string' ? argument : JSON.stringify(argument);
  }).join(' ');

  document.querySelector('#log').textContent += line + '\n';
},

clearLog: function() {
  document.querySelector('#log').textContent = '';
},

setStatus: function(status) {
  document.querySelector('#status').textContent = status;
},

setContent: function(newContent) {
  var content = document.querySelector('#content');
  while(content.hasChildNodes()) {
    content.removeChild(content.lastChild);
  }
  content.appendChild(newContent);
}
};

 if (/Chrome\/(\d+\.\d+.\d+.\d+)/.test(navigator.userAgent)){
    // Let's log a warning if the sample is not supposed to execute on this
    // version of Chrome.
    if (55 > parseInt(RegExp.$1)) {
      ChromeSamples.setStatus('Warning! Keep in mind this sample has been tested with Chrome ' + 55 + '.');
    }
  }



  async function onButtonClick() {
  let options = {};
  options.acceptAllDevices = true;

  try {
    log('Requesting Bluetooth Device...');
    log('with ' + JSON.stringify(options));
    const device = await navigator.bluetooth.requestDevice(options);

    log('> Name:             ' + device.name);
    log('> Id:               ' + device.id);
    log('> Connected:        ' + device.gatt.connected);
  } catch(error)  {
    log('Argh! ' + error);
  }
}

 document.querySelector('form').addEventListener('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (isWebBluetoothEnabled()) {
      ChromeSamples.clearLog();
      onButtonClick();
    }
  });

  log = ChromeSamples.log;

  function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
      return true;
    } else {
      ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
          'Please make sure the "Experimental Web Platform features" flag is enabled.');
      return false;
    }
  }

