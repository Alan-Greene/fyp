// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from './fetchAPIHelper.js';

// Call this function when page is loaded
function displayPatientsTriageOne(patients) {

    const rows = patients.map((patient) => {
        let row =
            `<tr>
                <td>${patient.calculated_times}</td>
            </tr>`;
        return row;
    });

    document.getElementById("triageOne").innerHTML = rows.join("");
}

function displayPatientsTriageTwo(patients) {

    const rows = patients.map((patient) => {
        let row =
            `<tr>
                <td>${patient.calculated_times}</td>
            </tr>`;
        return row;
    });

    document.getElementById("triageTwo").innerHTML = rows.join("");
}

function displayPatientsTriageThree(patients) {

    const rows = patients.map((patient) => {
        let row =
            `<tr>
                <td>${patient.calculated_times}</td>
            </tr>`;
        return row;
    });

    document.getElementById("triageThree").innerHTML = rows.join("");
}

function displayPatientsTriageFour(patients) {

    const rows = patients.map((patient) => {
        let row =
            `<tr>
                <td>${patient.calculated_times}</td>
            </tr>`;
        return row;
    });

    document.getElementById("triageFour").innerHTML = rows.join("");
}

function displayPatientsTriageFive(patients) {

    const rows = patients.map((patient) => {
        let row =
            `<tr>
                <td>${patient.calculated_times}</td>
            </tr>`;
        return row;
    });

    document.getElementById("triageFive").innerHTML = rows.join("");
}

//////////////////////////////////////////////////////

function displayAverageTimeTriageOne(average_time) {
    document.getElementById("triageOneAverage").innerHTML = `Average <br> ${average_time}`;
}

function displayAverageTimeTriageTwo(average_time) {
    document.getElementById("triageTwoAverage").innerHTML = `Average <br> ${average_time}`;
}

function displayAverageTimeTriageThree(average_time) {
    document.getElementById("triageThreeAverage").innerHTML = `Average <br> ${average_time}`;
}

function displayAverageTimeTriageFour(average_time) {
    document.getElementById("triageFourAverage").innerHTML = `Average <br> ${average_time}`;
}

function displayAverageTimeTriageFive(average_time) {
    document.getElementById("triageFiveAverage").innerHTML = `Average <br> ${average_time}`;
}

//////////////////////////////////////////////////////

async function loadPatientInfo() {
    const patients = await api.getDataAsync(`${api.TRIAGE_URL}`);
    if (Array.isArray(patients)) {
        addTimeToPatientObject(patients);
        let triageListOne = getTriageOneList(patients);
        let triageListTwo = getTriageTwoList(patients);
        let triageListThree = getTriageThreeList(patients);
        let triageListFour = getTriageFourList(patients);
        let triageListFive = getTriageFiveList(patients);

        displayPatientsTriageOne(triageListOne);
        displayPatientsTriageTwo(triageListTwo);
        displayPatientsTriageThree(triageListThree);
        displayPatientsTriageFour(triageListFour);
        displayPatientsTriageFive(triageListFive);

        let triageListOneAverage = generateAverage(triageListOne);
        let triageListTwoAverage = generateAverage(triageListTwo);
        let triageListThreeAverage = generateAverage(triageListThree);
        let triageListFourAverage = generateAverage(triageListFour);
        let triageListFiveAverage = generateAverage(triageListFive);

        displayAverageTimeTriageOne(triageListOneAverage);
        displayAverageTimeTriageTwo(triageListTwoAverage);
        displayAverageTimeTriageThree(triageListThreeAverage);
        displayAverageTimeTriageFour(triageListFourAverage);
        displayAverageTimeTriageFive(triageListFiveAverage);
    }
}


function addTimeToPatientObject(timePatients) {

    for (let i = 0; i < timePatients.length; i++) {
        for (var j = 0; j < timePatients[i].length; j++) {
            var stringDateCheckIn = (timePatients[i][j].arrival_date + ' ' + timePatients[i][j].arrival_time);
            var dateCheckIn = new Date(stringDateCheckIn)

            var stringDateCheckOut = (timePatients[i][j].checkout_date + ' ' + timePatients[i][j].checkout_time);
            var dateCheckOut = new Date(stringDateCheckOut)

            let time_diff = addTimeToPatientObjectCalc(dateCheckIn, dateCheckOut);
            //calculatedTimes.push(time_diff);
            //ids.push(timePatients[i]._id);

            timePatients[i][j].calculated_times = time_diff;
        }

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

    difference += (hours === 0 || hours === 1) ? `${hours} hour,    ` : `${hours} hours,    `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return difference;
}

function generateAverage(patientList) {

    let patients = patientList;

    var diffInMilliSeconds = 0;
    var total_milliseconds = 0;

    for (let i = 0; i < patients.length; i++) {

            console.log(diffInMilliSeconds);

            var stringDateCheckIn = (patients[i].arrival_date + ' ' + patients[i].arrival_time);
            var dateCheckIn = new Date(stringDateCheckIn)

            var stringDateCheckOut = (patients[i].checkout_date + ' ' + patients[i].checkout_time);
            var dateCheckOut = new Date(stringDateCheckOut)

            diffInMilliSeconds = generateMillisecondsAverageCalc(dateCheckIn, dateCheckOut) / 10;

            total_milliseconds += diffInMilliSeconds;
    }

    const days = Math.floor(total_milliseconds / 86400);
    total_milliseconds -= days * 86400;

    // calculate hours as a number
    const hours = Math.floor(total_milliseconds / 3600) % 24;
    total_milliseconds -= hours * 3600;

    // calculate minutes as a number
    const minutes = Math.floor(total_milliseconds / 60) % 60;
    total_milliseconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return difference;

}

function generateMillisecondsAverageCalc(dateCheckOut, dateRegistration) {
    let diffInMilliSeconds = Math.abs(dateCheckOut - dateRegistration) / 1000;
    //console.log(diffInMilliSeconds);
    return diffInMilliSeconds;
}


function getTriageOneList(triageLists) {
    let triageListOne = triageLists[0];
    return triageListOne
}

function getTriageTwoList(triageLists) {
    let triageListTwo = triageLists[1];
    return triageListTwo
}

function getTriageThreeList(triageLists) {
    let triageListThree = triageLists[2];
    return triageListThree
}

function getTriageFourList(triageLists) {
    let triageListFour = triageLists[3];
    return triageListFour
}

function getTriageFiveList(triageLists) {
    let triageListFive = triageLists[4];
    return triageListFive
}

export {
    displayPatientsTriageOne,
    displayPatientsTriageTwo,
    displayPatientsTriageThree,
    displayPatientsTriageFour,
    displayPatientsTriageFive,
    generateMillisecondsAverageCalc,
    generateAverage,
    loadPatientInfo,
    addTimeToPatientObject,
    addTimeToPatientObjectCalc,
    getTriageOneList,
    getTriageTwoList,
    getTriageThreeList,
    getTriageFourList,
    getTriageFiveList,
}

// load the script
loadPatientInfo();