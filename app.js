Stream = require('node-rtsp-stream');

// Please change router
var CAM_LOGIN = 'admin';
var CAM_PASSWORD = '';
var CAM_IP = '192.168.1.10';
var CAM_PORT = '554';

// var CAM_LOGIN = 'admin';
// var CAM_PASSWORD = 'JxtymGhj@cnb';
// var CAM_IP = '192.168.100.186';
// var CAM_PORT = '554';

let url = "rtsp://" + CAM_LOGIN + ":" + CAM_PASSWORD + "@" + CAM_IP;
stream = new Stream({
    name: 'name',
    streamUrl: url,
    wsPort: 5000
})
