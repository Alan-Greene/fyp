// import from fetchAPI.js as api to allow resources to be referenced as api.BASE_URL, etc.
import * as api from './fetchAPIHelper.js';

function displayAverageTimeTriageOne(average_time) {
    document.getElementById("triageOneAverage").innerHTML = `${average_time}`;
}

function displayAverageTimeTriageTwo(average_time) {
    document.getElementById("triageTwoAverage").innerHTML = `${average_time}`;
}

function displayAverageTimeTriageThree(average_time) {
    document.getElementById("triageThreeAverage").innerHTML = `${average_time}`;
}

function displayAverageTimeTriageFour(average_time) {
    document.getElementById("triageFourAverage").innerHTML = `${average_time}`;
}

function displayAverageTimeTriageFive(average_time) {
    document.getElementById("triageFiveAverage").innerHTML = `${average_time}`;
}

//////////////////////////////////////////////////////

function displayAverageTriageTimeTriageOne(average_time) {
    document.getElementById("triageOneTriageAverage").innerHTML = `${average_time}`;
    calculateDelayDisplay1(average_time, 5, 10);
}

function displayAverageTriageTimeTriageTwo(average_time) {
    document.getElementById("triageTwoTriageAverage").innerHTML = `${average_time}`;
    calculateDelayDisplay2(average_time, 5, 15);
}

function displayAverageTriageTimeTriageThree(average_time) {
    document.getElementById("triageThreeTriageAverage").innerHTML = `${average_time}`;
    calculateDelayDisplay3(average_time, 1, 2);
}

function displayAverageTriageTimeTriageFour(average_time) {
    document.getElementById("triageFourTriageAverage").innerHTML = `${average_time}`;
    calculateDelayDisplay4(average_time, 1, 2);
}

function displayAverageTriageTimeTriageFive(average_time) {
    document.getElementById("triageFiveTriageAverage").innerHTML = `${average_time}`;
    calculateDelayDisplay5(average_time, 1, 2);
}

//////////////////////////////////////////////////////

function calculateDelayDisplay1(average_time, ontime_number, delayed_number) {
    const timeArray = average_time.split(" ");
    const minutesNumber = parseInt(timeArray[2]);

    if (minutesNumber <= ontime_number) {
        document.getElementById("DisplayOne").classList.add("ontime");
        document.getElementById("DisplayOne").innerHTML = "NO DELAY";
    } else if (minutesNumber > ontime_number && minutesNumber < delayed_number) {
        document.getElementById("DisplayOne").classList.add("delayed");
        document.getElementById("DisplayOne").innerHTML = "SHORT DELAY";
    } else {
        document.getElementById("DisplayOne").classList.add("verydelayed");
        document.getElementById("DisplayOne").innerHTML = "LONG DELAY";
    }
}

function calculateDelayDisplay2(average_time, ontime_number, delayed_number) {
    const timeArray = average_time.split(" ");
    const minutesNumber = parseInt(timeArray[2]);

    if (minutesNumber <= ontime_number) {
        document.getElementById("DisplayTwo").classList.add("ontime");
        document.getElementById("DisplayTwo").innerHTML = "NO DELAY";
    } else if (minutesNumber > ontime_number && minutesNumber < delayed_number) {
        document.getElementById("DisplayTwo").classList.add("delayed");
        document.getElementById("DisplayTwo").innerHTML = "SHORT DELAY";
    } else {
        document.getElementById("DisplayTwo").classList.add("verydelayed");
        document.getElementById("DisplayTwo").innerHTML = "LONG DELAY";
    }
}

function calculateDelayDisplay3(average_time, ontime_number, delayed_number) {
    const timeArray = average_time.split(" ");
    const hoursNumber = parseInt(timeArray[0]);

    if (hoursNumber < ontime_number) {
        document.getElementById("DisplayThree").classList.add("ontime");
        document.getElementById("DisplayThree").innerHTML = "NO DELAY";
    } else if (hoursNumber >= ontime_number && hoursNumber < delayed_number) {
        document.getElementById("DisplayThree").classList.add("delayed");
        document.getElementById("DisplayThree").innerHTML = "SHORT DELAY";
    } else {
        document.getElementById("DisplayThree").classList.add("verydelayed");
        document.getElementById("DisplayThree").innerHTML = "LONG DELAY";
    }
}

function calculateDelayDisplay4(average_time, ontime_number, delayed_number) {
    const timeArray = average_time.split(" ");
    const hoursNumber = parseInt(timeArray[0]);

    if (hoursNumber < ontime_number) {
        document.getElementById("DisplayFour").classList.add("ontime");
        document.getElementById("DisplayFour").innerHTML = "NO DELAY";
    } else if (hoursNumber >= ontime_number && hoursNumber < delayed_number) {
        document.getElementById("DisplayFour").classList.add("delayed");
        document.getElementById("DisplayFour").innerHTML = "SHORT DELAY";
    } else {
        document.getElementById("DisplayFour").classList.add("verydelayed");
        document.getElementById("DisplayFour").innerHTML = "LONG DELAY";
    }
}

function calculateDelayDisplay5(average_time, ontime_number, delayed_number) {
    const timeArray = average_time.split(" ");
    const hoursNumber = parseInt(timeArray[0]);

    if (hoursNumber < ontime_number) {
        document.getElementById("DisplayFive").classList.add("ontime");
        document.getElementById("DisplayFive").innerHTML = "NO DELAY";
    } else if (hoursNumber >= ontime_number && hoursNumber < delayed_number) {
        document.getElementById("DisplayFive").classList.add("delayed");
        document.getElementById("DisplayFive").innerHTML = "SHORT DELAY";
    } else {
        document.getElementById("DisplayFive").classList.add("verydelayed");
        document.getElementById("DisplayFive").innerHTML = "LONG DELAY";
    }
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

        let triageListOneTriageAverage = generateAverageTriage(triageListOne);
        let triageListTwoTriageAverage = generateAverageTriage(triageListTwo);
        let triageListThreeTriageAverage = generateAverageTriage(triageListThree);
        let triageListFourTriageAverage = generateAverageTriage(triageListFour);
        let triageListFiveTriageAverage = generateAverageTriage(triageListFive);

        displayAverageTriageTimeTriageOne(triageListOneTriageAverage);
        displayAverageTriageTimeTriageTwo(triageListTwoTriageAverage);
        displayAverageTriageTimeTriageThree(triageListThreeTriageAverage);
        displayAverageTriageTimeTriageFour(triageListFourTriageAverage);
        displayAverageTriageTimeTriageFive(triageListFiveTriageAverage);
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

function addTriageTimeToPatientObject(timePatients) {


    for (let i = 0; i < timePatients.length; i++) {
        for (var j = 0; j < timePatients[i].length; j++) {

            var stringDateCheckIn = (timePatients[i][j].arrival_date + ' ' + timePatients[i][j].arrival_time);
            var dateCheckIn = new Date(stringDateCheckIn)

            var stringDateTriageTime = (timePatients[i][j].triage_date + ' ' + timePatients[i][j].triage_time);
            var dateTriageTime = new Date(stringDateTriageTime)

            let time_diff_triage = addTimeToPatientObjectCalc(dateCheckIn, dateTriageTime);

            timePatients[i][j].calculated_times_triage = time_diff_triage;
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

function generateAverageTriage(patientList) {

    let patients = patientList;

    var diffInMilliSeconds = 0;
    var total_milliseconds = 0;

    for (let i = 0; i < patients.length; i++) {

        var stringDateCheckIn = (patients[i].arrival_date + ' ' + patients[i].arrival_time);
        var dateCheckIn = new Date(stringDateCheckIn)

        var stringDateTriage = (patients[i].triage_date + ' ' + patients[i].triage_time);
        var dateTriage = new Date(stringDateTriage)

        diffInMilliSeconds = generateMillisecondsAverageCalc(dateCheckIn, dateTriage) / 10;

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
    addTriageTimeToPatientObject,
    generateAverageTriage,
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