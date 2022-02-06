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
    time_diff();
    const patient_info = patient_info_repository.getPatientInfo();
    return patient_info
}

function time_diff() {
    const patient_info = patient_info_repository.getPatientInfo();
    let calculatedTimes = new Array();
    let ids = new Array()

    for (let i = 0; i < patient_info.length; i++) {

        console.log(patient_info[i]);

        var stringDateCheckIn = (patient_info[i].arrival_date + ' ' + patient_info[i].arrival_time);
        console.log(stringDateCheckIn);
        var dateCheckIn = new Date(stringDateCheckIn)
        console.log(dateCheckIn);

        var stringDateCheckOut = (patient_info[i].checkout_date + ' ' + patient_info[i].checkout_time);
        console.log(stringDateCheckOut);
        var dateCheckOut = new Date(stringDateCheckOut)
        console.log(dateCheckOut);

        let time_diff = timeDiffCalc(dateCheckIn, dateCheckOut);
        console.log(typeof (time_diff));
        calculatedTimes.push(time_diff);
        ids.push(patient_info[i]._id);

        console.log(calculatedTimes[i]);
    }

    patient_info_repository.x(ids, calculatedTimes);
    //return [ids, calculatedTimes];
}

// function addCalculatedTimesToDb(ids, calculatedTimes) {

//     let mysql = require('mysql');
//     let config = {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: '../database/db.js'
//     };
//     let connection = mysql.createConnection(config);

//     // insert statment
//     for (let i = 0; i < calculatedTimes.length; i++) {
//         let sql = `INSERT INTO patient_info (calculated_ed_duration)
//                  VALUES ${calculatedTimes[i]} WHERE patient_info._id = ${ids[i]}`;
//         connection.query(sql);
//     }
//     connection.end();
// }

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

function timeDiffCalc(dateCheckOut, dateRegistration) {
    let diffInMilliSeconds = Math.abs(dateCheckOut - dateRegistration) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return difference;
}


module.exports = {
    getPatientInfo,
    getPatientInfoById,
}
