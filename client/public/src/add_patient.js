import * as api from './fetchAPIHelper.js';
import { Patient } from './models/add_patient_model.js';

document.getElementById('formSubmit').addEventListener('click', addOrUpdatePatient);

async function addOrUpdatePatient() {

    // url for api call
    const url = `${api.BASE_URL}`
    // New patient = POST, Update = PUT
    let httpMethod = 'POST';

    // Get the form data as a Patient Object
    const formPatient = getPatientForm();
    // log to console
    console.log(formPatient);

    console.log('%cNew Patient: ', 'color: green', formPatient);

    // Check if new patient or update
    // Only existing patient have formPatient._id > 0

    // use fetchInit to build the request
    // The second param is the form data (patient Object) which is sent as JSON in the request body
    const request = api.fetchInit(httpMethod, JSON.stringify(formPatient));

    try {
        // Call fetch and await the respose
        // fetch url using request object
        const result = await api.getDataAsync(url, request);
        // Output result to console (for testing purposes) 
        console.log(result);
        // catch and log any errors
    } catch (err) {
        console.log(err);
        return err;
    }

} // End function

function getPatientForm() {
    // new Patient object constructed from the form values
    // Note: These should be validated!!
    return new Patient(
        // read the form values and pass to the Patient constructor
        document.getElementById('birth_year').value,
        document.getElementById('birth_month').value,
        document.getElementById('gender').value,
        document.getElementById('patient_status').value,
        document.getElementById('arrival_date').value,
        document.getElementById('arrival_time').value,
        document.getElementById('triage_date').value,
        document.getElementById('triage_time').value,
        document.getElementById('checkout_date').value,
        document.getElementById('checkout_time').value,
        document.getElementById('returning_visit').value,
        document.getElementById('arrival_mode').value,
        document.getElementById('referral').value,
        document.getElementById('triage_score').value,
        document.getElementById('complaint').value,
        document.getElementById('diagnosis').value,
        document.getElementById('outcome').value,
        document.getElementById('destination').value,
        document.getElementById('phone_number').value,
        document.getElementById('password').value
    );

}

export {
    addOrUpdatePatient,
    getPatientForm
}
