// Dependencies
const cron = require("node-cron");

// require the database connection
const { dbConn } = require('../database/db.js');

const patient_password_service = require('../services/password.js')

const sms_service = require('../services/sms');

// Define SQL statements here for use in the functions below
const SQL_PATIENT_INFO_ALL = 'SELECT _id, triage_score, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info';

const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 1 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 2 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 3 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 4 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 5 ORDER BY _id DESC limit 10';

const SQL_PATIENT_INFO_BYID = 'SELECT _id, triage_score FROM patient_info WHERE _id = ?;';

const SQL_PATIENT_GENERATE_PASSWORD = 'SELECT _id, arrival_date, arrival_time, birth_month, birth_year FROM patient_info WHERE password is NULL';
const SQL_PATIENT_SET_PASSWORD = 'UPDATE patient_info SET password = ? WHERE _id = ? AND password IS NULL';

const SQL_PATIENT_INFO_BY_URL = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE password = ?;';

const SQL_PATIENT_INSERT = 'INSERT INTO patient_info (birth_year, birth_month, gender, patient_status, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time, returning_visit, arrival_mode, referral, triage_score, complaint, diagnosis, outcome, destination, phone_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

const SQL_PATIENT_SMS = 'SELECT phone_number, password FROM patient_info ORDER BY _id DESC LIMIT 1';

// Function which uses the SQL_PATIENT_INFO_ALL query to retrieve all patient rows from the database.
function getPatientInfo() {
    let patient_info;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_ALL);
        patient_info = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {

    }

    return patient_info;
}

// Function which uses the SQL_PATIENT_INFO_BYID query to retrieve a patient row from the database based upon _id parameter passed from the URL.

function getPatientInfoById(id) {
    let patient_info;

    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_PATIENT_INFO_BYID)

        // set id parameter value
        patient_info = result.get(id);

        // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get all patients: ', err.message);
    } finally {

    }
    // return a single patient if found
    return patient_info;
}

function getPatientInfoByUrl(url) {
    let patient_info;

    try {
        // Execute the SQL
        const result = dbConn.prepare(SQL_PATIENT_INFO_BY_URL)

        // set id parameter value
        patient_info = result.get(url);

        // Catch and log errors to server side console 
    } catch (err) {
        console.log('DB Error - get patient info by url: ', err.message);
    } finally {

    }
    //console.log(patient_info);
    // return a single patient if found
    return patient_info;
}

function getPatientInfoGeneratePassword() {
    let patient_info;

    try {
        const result = dbConn.prepare(SQL_PATIENT_GENERATE_PASSWORD)
        patient_info = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {

    }

    return patient_info;

}

async function setPatientPassword() {

    var patients = getPatientInfoGeneratePassword();

    var id_list = patient_password_service.generateIdList(patients);
    var password_list = patient_password_service.generatePlainTextPasswordList(patients);
    var hashed_password_list = await patient_password_service.generatePasswordList(password_list);

    for (let i = 0; i < id_list.length; i++) {

        try {
            const stmt = dbConn.prepare(SQL_PATIENT_SET_PASSWORD);
            stmt.run(hashed_password_list[i], id_list[i]);
        } catch (err) {
            console.log('DB Error - setPatientPassword: ', err.message);
        }
    }

    //const phone_number = latest_patient.phone_number
    sms_service.sendSms(hashed_password_list[0]);
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE query to retrieve the latest 10 patients from the database in triage category one.
function getLastTenTriageOne() {

    let lastTenTriageOne;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE);
        lastTenTriageOne = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category one: ', err.message);
    } finally {

    }
    return lastTenTriageOne;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO query to retrieve the latest 10 patients from the database in triage category two.
function getLastTenTriageTwo() {

    let lastTenTriageTwo;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO);
        lastTenTriageTwo = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category two: ', err.message);
    } finally {

    }

    return lastTenTriageTwo;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE query to retrieve the latest 10 patients from the database in triage category three.
function getLastTenTriageThree() {

    let lastTenTriageThree;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE);
        lastTenTriageThree = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category three: ', err.message);
    } finally {

    }

    return lastTenTriageThree;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR query to retrieve the latest 10 patients from the database in triage category four.
function getLastTenTriageFour() {

    let lastTenTriageFour;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR);
        lastTenTriageFour = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category four: ', err.message);
    }

    return lastTenTriageFour;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE query to retrieve the latest 10 patients from the database in triage category five.
function getLastTenTriageFive() {

    let lastTenTriageFive;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE);
        lastTenTriageFive = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category five: ', err.message);
    } finally {

    }

    return lastTenTriageFive;
}

// insert/create a new patient
let insertPatient = async (patient) => {
    let newPatient;

    try {
        const stmt = dbConn.prepare(SQL_PATIENT_INSERT);
        stmt.run(patient.birth_year, patient.birth_month, patient.gender, patient.patient_status, patient.arrival_date, patient.arrival_time,
            patient.triage_date, patient.triage_time, patient.checkout_date, patient.checkout_time, patient.returning_visit, patient.arrival_mode, patient.referral, patient.triage_score,
            patient.complaint, patient.diagnosis, patient.outcome, patient.destination, patient.phone_number, patient.password);

    } catch (err) {
        console.log('DB Error - insertPatient: ', err.message);
    } finally {
        setPatientPassword();
    }

    return newPatient;
}

/*
Posible option explored for sending url via SMS

function send (patient) {

    const phone_number = patient.phone_number;
    const password = patient.password;

    const url_send = "http://localhost:5000/url/individual/" + '' + password;

    fetch('/', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({phone_number: phone_number, url_send: url_send})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    });
}
*/

//Cron job  for testing password propagation
cron.schedule("*/30 * * * * *", function () {
    setPatientPassword();
    console.log("COMPLETE");
});


// Export the modules
module.exports = {
    getPatientInfo,
    getPatientInfoById,
    getPatientInfoByUrl,
    getLastTenTriageOne,
    getLastTenTriageTwo,
    getLastTenTriageThree,
    getLastTenTriageFour,
    getLastTenTriageFive,
    getPatientInfoGeneratePassword,
    setPatientPassword,
    insertPatient
};