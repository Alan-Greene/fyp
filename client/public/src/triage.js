// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from './fetchAPIHelper.js';

  // Call this function when page is loaded
  function displayPatientsByTriageOne(patients){

    const rows = patients.map((patient) => {
      let row = `<tr>
                  <td>${patient._id}</td>
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


async function loadPatientInfo() {
  const patients = await api.getDataAsync(`${api.BASE_URL}`);
  if (Array.isArray(patients)) {
    addTimeToPatientObject(patients);
    displayPatients(patients)

  }
}


function addTimeToPatientObject(timePatients) {

  //let calculatedTimes = new Array();
  //let ids = new Array()

  for (let i = 0; i < timePatients.length; i++) {

    var stringDateCheckIn = (timePatients[i].arrival_date + ' ' + timePatients[i].arrival_time);
    var dateCheckIn = new Date(stringDateCheckIn)

    var stringDateCheckOut = (timePatients[i].checkout_date + ' ' + timePatients[i].checkout_time);
    var dateCheckOut = new Date(stringDateCheckOut)

    let time_diff = addTimeToPatientObjectCalc(dateCheckIn, dateCheckOut);
    //calculatedTimes.push(time_diff);
    //ids.push(timePatients[i]._id);

    timePatients[i].calculated_times = time_diff;

  }
}

function addTimeToPatientObjectCalc(dateCheckOut, dateRegistration) {
  let diffInMilliSeconds = Math.abs(dateCheckOut - dateRegistration) / 1000;

  // calculate days as a number
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours as a number
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes as a number
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  //Convert the numbers into a text string called difference for display
  let difference = '';
  if (days > 0) {
    difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  }

  difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

  difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

  return difference;
}

export {
  displayPatients,
  loadPatientInfo,
  addTimeToPatientObject,
  addTimeToPatientObjectCalc,
}

// load the script
loadPatientInfo();