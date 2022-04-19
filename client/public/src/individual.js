
// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
//import req from 'express/lib/request';
import * as api from './fetchAPIHelper.js';

// Call this function when page is loaded
function displayPatients(patients) {

  const rows = patients.map((patient) => {
    let row = `<tr>
                  <td>${patient.triage_score}</td>
                  <td>${patient.arrival_date}</td>
                  <td>${patient.arrival_time}</td>
                  <td>${patient.checkout_date}</td>
                  <td>${patient.checkout_time}</td>
                  <td>${patient.calculated_times}</td>
                </tr>`;
    return row;
  });

  document.getElementById("patientrows").innerHTML = rows.join("");
}

async function loadIndividualPatientInfo() {

  console.log("1", window.location.href);
  const patients = await api.getDataAsync(`${api.INDIVIDUAL_URL}`);
  console.log(`${api.INDIVIDUAL_URL}/$2b$10$IX9eamTVNhkc2Hmq.IKzI.iVXENsJWHdlhNA1625t65QsNBaa8LmG`);
  console.log(typeof(patients));
  //addTimeToPatientObject(patients);
  displayPatients(patients);


}


// function addTimeToPatientObject() {

// }

// function addTimeToPatientObjectCalc() {

// }

export {
  displayPatients,
  loadIndividualPatientInfo,
  // addTimeToPatientObject,
  // addTimeToPatientObjectCalc,
}

// load the script
console.log("before");
loadIndividualPatientInfo();
console.log("after");