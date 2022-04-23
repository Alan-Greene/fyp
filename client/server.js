// server.js

const http = require('http');

// load express as a deoendency
const express = require('express');
//const api = require('./public/src/fetchAPIHelper.js');
// Define Express App
const app = express();

// Define the client host IP and port
const HOST = 'ec2-52-90-249-241.compute-1.amazonaws.com';
const PORT = 3000;

// Serve Static Assets from the public folder
app.use(express.static('public'));



// Start the server and listen for requests
app.listen(PORT, HOST, () => {
  console.log(`Server connected at http://${HOST}:${PORT}`);
});