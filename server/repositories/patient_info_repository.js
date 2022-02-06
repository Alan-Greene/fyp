// Dependencies

// require the database connection

const { dbConn } = require('../database/db.js');
//const patientService = require('../services/patient_service.js');

// Define SQL statements here for use in function below
// These are parameterised queries.
// Input parameters are parsed and set before queries are executed
// Parameterised Queries

const SQL_PATIENT_INFO_ALL = 'SELECT _id, triage_score, ed_duration, arrival_date, arrival_time, checkout_date, checkout_time FROM patient_info ORDER BY _id DESC limit 10';
const SQL_PATIENT_INFO_BYID = 'SELECT _id, triage_score, ed_duration FROM patient_info WHERE _id = ?;';

// A function to get all products from the database

// products will be returned

//

function x(ids, calculatedTimes){
    for (let i = 0; i < calculatedTimes.length; i++) {
        try {
            const stmt = dbConn.prepare(`UPDATE patient_info SET calculated_ed_duration = (?) WHERE _id = (?)`);
            const info = stmt.run(`${calculatedTimes[i]}`, `${ids[i]}`);
            console.log(info.changes); 
        } catch (err) {
            console.log('DB Error - insert_calc: ', err.message);
        }
    }
}

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

// function setCalculatedEdDuration() {
//     let [ids, calculatedTimes] = patientService.time_diff();

//     console.log(ids);

//     for (let i = 0; i < patient_service.ids.length; i++) {
//         const SQL_CALCULATED_ED_DURATION_INSERT = `INSERT INTO patient_info (calculated_ed_duration) VALUES (${calculatedTimes[i]} WHERE _id = ${ids[i]})`
//         try {
//             dbConn.query(SQL_CALCULATED_ED_DURATION_INSERT)
//             } catch (err) {
//             console.log('DB Error - setCalculatedEdDuration: ', err.message);
//             } finally {
//         }
//     }
// }

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

// Export

module.exports = {
getPatientInfo,
getPatientInfoById,
x
};