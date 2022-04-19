// require imports packages required by the application
const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');

// Specify Host and port
const HOST = 'ec2-54-234-7-248.compute-1.amazonaws.com';
const PORT = 5000;

// app is a new instance of express (the web app framework)
let app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

// Application settings
app.use((req, res, next) => {

// Globally set Content-Type header for the application
res.setHeader("Content-Type", "application/json");
next();
});

//Allow app to support differnt body content types
app.use(express.text());

// support json encoded bodies
app.use(express.json());

// support url encoded bodies
app.use(express.urlencoded({extended: true}));

// cors
// https://www.npmjs.com/package/cors
// https://codesquery.com/enable-cors-nodejs-express-app/
// Simple Usage (Enable All CORS Requests)
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors()); // include before other routes

/* Configure app Routes to handle requests from browser */
// The default route
app.use('/', require('./controllers/index'));
app.use('/url', require('./controllers/url'));
app.use('/patient_info', require('./controllers/patient_info'));
app.use('/patient_info/triage', require('./controllers/patient_info'));

app.use((req, res, next) => {
const err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
err.status = 404;
next(err);
});

app.post('/', (req, res) =>{
    res.send(req.body);
    console.log(req.body);
})

app.use(favicon(__dirname + '/public/favicon.ico'));

// Start the HTTP server using HOST address and PORT consts defined above
// Lssten for incoming connections
const server = app.listen(PORT, HOST, () => {
console.log(`Express server listening on http://${HOST}:${PORT}`);
});

// export this as a module, making the app object available when imported.
module.exports = app;