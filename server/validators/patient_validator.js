const validator = require('validator');

// models
const Patient = require ('../models/patients.js');

// function to validate an id
// An id is a positive number with no sign (+,-, etc.)
// return Not a number or else cast as Number and return
//
function validateId(num) {
    if (validator.isNumeric(num + '', { no_symbols: true })) {
        return Number(num);
    }
    return NaN;
}

// Validate the body data, sent by the client, for a new product
// formProduct represents the data filled in a form
// It needs to be validated before using in gthe application
function validatePatient(formPatient) {
    // Declare constants and variables
    let validatedPatient;

    // new product has no id
    let patientId = 0;

    // debug to console - if no data
    if (formPatient === null) {
        console.log("validateNewPatient(): Parameter is null");
    }

    // Check if id field is included in the form object
    // if yes then assign it to productId
    if (formPatient.hasOwnProperty('_id')) {
        patientId = formPatient._id
    }

    // Validate form data for new product fields
    // Creating a product does not need a product id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    // appending + '' to numbers as the validator only works with strings
    if (
        //validateId(patientId) &&
        !validator.isEmpty(formPatient.checkin_date) &&
        !validator.isEmpty(formPatient.checkin_time) &&
        validator.isNumeric(formPatient.birth_year + '', { no_symbols: true, allow_negatives: false }) &&
        validator.isDate(formPatient.triage_date + '', { no_symbols: true, allow_negatives: false })) {
        // Validation passed
        // create a new Product instance based on Product model object
        // no value for product id (passed as null)
        validatedPatient = new Patient(
            //patientId,
            validator.escape(formPatient.birth_year),
            validator.escape(formPatient.birth_month),
            validator.escape(formPatient.gender),
            validator.escape(formPatient.patient_status),
            validator.escape(formPatient.arrival_date),
            validator.escape(formPatient.arrival_time),
            validator.escape(formPatient.triage_date),
            validator.escape(formPatient.triage_time),
            validator.escape(formPatient.returning_visit),
            validator.escape(formPatient.arrival_mode),
            validator.escape(formPatient.referral),
            validator.escape(formPatient.triage_score),
            validator.escape(formPatient.complaint),
            validator.escape(formPatient.diagnosis),
            validator.escape(formPatient.outcome),
            validator.escape(formPatient.destination)
        );
    } else {
        // debug
        console.log("validateNewPatient(): Validation failed");
    }
    // return new validated product object
    return validatedPatient;
}

// Module exports
// expose these functions
module.exports = {
    validateId,
    validatePatient
};