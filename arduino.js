const express = require('express');
const app = express();
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;



app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/data.html', function (req, res) {
    res.sendFile(__dirname + '/data.html')
});

app.get('/interact.html', function (req, res) {
    res.sendFile(__dirname + '/interact.html')
});

app.get('/exercises.html', function (req, res) {
    res.sendFile(__dirname + '/exercises.html')
});




var parser = new Readline();

var serialport = new SerialPort("COM3", {
    baudRate: 9600
},function (err) { if(err) {
    return console.log("Error", err.message);
}});

serialport = serialport.pipe(parser);

serialport.on('open', function() {
    console.log('Serial Port Opened!');
});

serialport.on('error', function(err) {
    console.log('Error: ', err.message);
});


io.on('connection', function(socket){
    serialport.on('data', function(data) {
        var d = data.toString('ascii').split(',');
        d = d.map(f => parseFloat(f));
        console.log(JSON.stringify(d));
        io.emit('data', JSON.stringify(d));
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

