const patient_info_repository = require('../repositories/patient_info_repository.js')

const validator = require('validator');

// functio to validate an id
// An id is a positive number with no sign (+,-, etc.)
// return Not a number or else cast as Number and return
//
function validateId(num) {
    if (validator.isNumeric(num, { no_symbols: true })) {
        return Number(num);
    }
    return NaN;
}

function getPatientInfo() {
    const patient_info = patient_info_repository.getPatientInfo();
    return patient_info
}

// Function to get patient by id
function getPatientInfoById(id) {
    // validate the id
    if (validateId(id, { no_symbols: true })) {
        // Call the repository function to get product matching id
        const patient_info = patient_info_repository.getPatientInfoById(id);

        // return the patient information
        return patient_info
    } else {
        return "Invalid Id";
    }
}

function getLastTenTriageOne() {
    const lastTenTriageOne = patient_info_repository.getLastTenTriageOne();
    return lastTenTriageOne;
}

function getLastTenTriageTwo() {
    const lastTenTriageTwo = patient_info_repository.getLastTenTriageTwo();
    return lastTenTriageTwo;
}

function getLastTenTriageThree() {
    const lastTenTriageThree = patient_info_repository.getLastTenTriageThree();
    return lastTenTriageThree;
}

function getLastTenTriageFour() {
    const lastTenTriageFour = patient_info_repository.getLastTenTriageFour();
    return lastTenTriageFour;
}

function getLastTenTriageFive() {
    const lastTenTriageFive = patient_info_repository.getLastTenTriageFive();
    return lastTenTriageFive;
}

module.exports = {
    getPatientInfo,
    getPatientInfoById,
    getLastTenTriageOne,
    getLastTenTriageTwo,
    getLastTenTriageThree,
    getLastTenTriageFour,
    getLastTenTriageFive
}
