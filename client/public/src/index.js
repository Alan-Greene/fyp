
// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from './fetchAPIHelper.js';

// Call this function when Add button is clicked
function displayPatients(patients){
  const rows = patients.map((patient) => {
    let row = `<tr>
                <td>${patient._id}</td>
                <td>${patient.triage_score}</td>

                <td>${patient.arrival_date}</td>
                <td>${patient.arrival_time}</td>
                <td>${patient.checkout_date}</td>
                <td>${patient.checkout_time}</td>

                <td>${patient.calculated_ed_duration}</td>
              </tr>`;
    return row;
  });

  document.getElementById("patientrows").innerHTML = rows.join("");
}

async function loadPatientInfo() {
  const patients = await api.getDataAsync(`${api.BASE_URL}`);

  if (Array.isArray(patients)) {
    displayPatients(patients)

  }
}

export {
 displayPatients,
 loadPatientInfo
}

// load the script
loadPatientInfo();