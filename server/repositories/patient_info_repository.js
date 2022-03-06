// Dependencies

// require the database connection
const { dbConn } = require('../database/db.js');

const patient_password_service = require('../services/password.js')

// Define SQL statements here for use in the functions below
const SQL_PATIENT_INFO_ALL = 'SELECT _id, triage_score, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 1 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 2 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 3 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 4 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE = 'SELECT _id, triage_score, arrival_date, arrival_time, triage_date, triage_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 5 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_BYID = 'SELECT _id, triage_score, ed_duration FROM patient_info WHERE _id = ?;';
const SQL_PATIENT_GENERATE_PASSWORD = 'SELECT _id, arrival_date, arrival_time, birth_month, birth_year FROM patient_info';
const SQL_PATIENT_SET_PASSWORD = 'UPDATE patient_info SET password = ? WHERE _id = ? AND password IS NULL';


// Function which uses the SQL_PATIENT_INFO_ALL query to retrieve all patient rows from the database.
function getPatientInfo() {
    let patient_info;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_ALL)
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

function setPatientPassword() {
    let passwordPatients = getPatientInfoGeneratePassword();
    let password_list = patient_password_service.generatePasswordList(passwordPatients);

    console.log(password_list);

    let id_list = patient_password_service.generateIdList(passwordPatients);

    console.log(id_list);


    //console.log(id_list);

    //console.log(password_list);

    for (let i = 0; i < id_list.length; i++) {

        try {
            const stmt = dbConn.prepare(SQL_PATIENT_SET_PASSWORD);

            stmt.run(password_list[i], id_list[i]);
        } catch (err) {
            console.log('DB Error - setPatientPassword: ', err.message);
        }
    }
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE query to retrieve the latest 10 patients from the database in triage category one.
function getLastTenTriageOne() {


    setPatientPassword();

    let lastTenTriageOne;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE)
        lastTenTriageOne = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category one: ', err.message);
    } finally {

    }
    console.log("getLastTenTriage : One : confirmed");
    return lastTenTriageOne;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO query to retrieve the latest 10 patients from the database in triage category two.
function getLastTenTriageTwo() {

    let lastTenTriageTwo;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO)
        lastTenTriageTwo = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category two: ', err.message);
    } finally {

    }

    console.log("getLastTenTriage: Two : confirmed");
    return lastTenTriageTwo;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE query to retrieve the latest 10 patients from the database in triage category three.
function getLastTenTriageThree() {

    let lastTenTriageThree;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE)
        lastTenTriageThree = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category three: ', err.message);
    } finally {

    }

    console.log("getLastTenTriage: Three : confirmed");
    return lastTenTriageThree;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR query to retrieve the latest 10 patients from the database in triage category four.
function getLastTenTriageFour() {

    let lastTenTriageFour;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR)
        lastTenTriageFour = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category four: ', err.message);
    } finally {

    }

    console.log("getLastTenTriage: Four : confirmed");
    return lastTenTriageFour;
}

// Function which uses the SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE query to retrieve the latest 10 patients from the database in triage category five.
function getLastTenTriageFive() {

    let lastTenTriageFive;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE)
        lastTenTriageFive = result.all();
    } catch (err) {
        console.log('DB Error - get last 10 patients in category five: ', err.message);
    } finally {

    }


    console.log("getLastTenTriage: Five : confirmed");
    return lastTenTriageFive;
}

// Export the modules
module.exports = {
    getPatientInfo,
    getPatientInfoById,
    getLastTenTriageOne,
    getLastTenTriageTwo,
    getLastTenTriageThree,
    getLastTenTriageFour,
    getLastTenTriageFive,
    getPatientInfoGeneratePassword,
    setPatientPassword
};