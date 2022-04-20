// server.js

const http = require('http');

// load express as a deoendency
const express = require('express');
//const api = require('./public/src/fetchAPIHelper.js');
// Define Express App
const app = express();

// Defile the server host IP and port
const HOST = 'ec2-107-21-129-199.compute-1.amazonaws.com';
// if port defined in ENV, use that value, otherwise 3000
const PORT = 3000;

// Serve Static Assets from the public folder
app.use(express.static('public'));



// Start the server and listen for requests
app.listen(PORT, HOST, () => {
  console.log(`Server connected at http://${HOST}:${PORT}`);
});