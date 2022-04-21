const patient_info_repository = require("../repositories/patient_info_repository.js");
const patientValidator = require("../validators/patient_validator.js");
// functio to validate an id
// An id is a positive number with no sign (+,-, etc.)
// return Not a number or else cast as Number and return
//


function getPatientInfo() {
    const patient_info = patient_info_repository.getPatientInfo();
    return patient_info
}

// Function to get patient by id
function getPatientInfoById(id) {
    // validate the id
    if (patientValidator.validateId(id, { no_symbols: true })) {
        // Call the repository function to get patient matching id
        const patient_info = patient_info_repository.getPatientInfoById(id);

        // return the patient information
        return patient_info
    } else {
        return "Invalid Id";
    }
}

// Function to get patient by url
function getPatientInfoByUrl(url) {
    const patient_info = patient_info_repository.getPatientInfoByUrl(url);
    return patient_info
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

async function addOrUpdatePatient(patientForm) {
    // declare variables
    let result;
    result = await patient_info_repository.insertPatient(patientForm);


    // // Call the patient validator - kept seperate to avoid clutter here
    // let validatedPatient = patientValidator.validatePatient(patientForm);

    // // If validation returned a patient object - save to database
    // if (validatedPatient != null) {
    //     result = await patientRepository.insertPatient(validatedPatient);

    // } else {
    //     // Patient data failed validation
    //     result = { result: "error - invalid patient" }; // log the result

    //     console.log("patientService.createPatient(): form data validate failed");
    // } // return the newly inserted patient
    // console.log("RESULT", result);
    return result;
}

let updatePatient = async (patient) => {
    return true;
};

let deletePatient = async (id) => {
    return true;
};


module.exports = {
    getPatientInfo,
    getPatientInfoById,
    getPatientInfoByUrl,
    getLastTenTriageOne,
    getLastTenTriageTwo,
    getLastTenTriageThree,
    getLastTenTriageFour,
    getLastTenTriageFive,
    addOrUpdatePatient,
    updatePatient,
    deletePatient
}
