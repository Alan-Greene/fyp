// Dependencies

// require the database connection

const { dbConn } = require('../database/db.js');
//const patient_service = require('../services/patient_service.js')
//const patientService = require('../services/patient_service.js');

// Define SQL statements here for use in function below
// These are parameterised queries.
// Input parameters are parsed and set before queries are executed
// Parameterised Queries

const SQL_PATIENT_INFO_ALL = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 1 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 2 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 3 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 4 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info WHERE triage_score = 5 ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_BYID = 'SELECT _id, triage_score, ed_duration FROM patient_info WHERE _id = ?;';

// A function to get all products from the database

// products will be returned

//

// function x(ids, calculatedTimes) {
//     for (let i = 0; i < calculatedTimes.length; i++) {
//         try {
//             const stmt = dbConn.prepare(`UPDATE patient_info SET calculated_ed_duration = (?) WHERE _id = (?)`);
//             const info = stmt.run(`${calculatedTimes[i]}`, `${ids[i]}`);
//             //console.log(info.changes); 
//         } catch (err) {
//             console.log('DB Error - insert_calc: ', err.message);
//         }
//     }
// }

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

function getPatientInfoById(id) {
    let patient_info;

    // execute SQL
    // Note await in try/catch block
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

function getLastTenTriageOne() {

    let lastTenTriageOne;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_ONE)
        lastTenTriageOne = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {
 
    }

    return lastTenTriageOne;
}

function getLastTenTriageTwo() {

    let lastTenTriageTwo;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_TWO)
        lastTenTriageTwo = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {
 
    }

    return lastTenTriageTwo;
}

function getLastTenTriageThree() {

    let lastTenTriageThree;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_THREE)
        lastTenTriageThree = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {
 
    }

    return lastTenTriageThree;
}

function getLastTenTriageFour() {

    let lastTenTriageFour;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FOUR)
        lastTenTriageFour = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {
 
    }

    return lastTenTriageFour;
}

function getLastTenTriageFive() {

    let lastTenTriageFive;

    try {
        const result = dbConn.prepare(SQL_PATIENT_INFO_LAST_TEN_TRIAGE_FIVE)
        lastTenTriageFive = result.all();
    } catch (err) {
        console.log('DB Error - get all patient_info: ', err.message);
    } finally {
 
    }

    return lastTenTriageFive;
}

// Export

module.exports = {
    getPatientInfo,
    getPatientInfoById,
    getLastTenTriageOne,
    getLastTenTriageTwo,
    getLastTenTriageThree,
    getLastTenTriageFour,
    getLastTenTriageFive
};