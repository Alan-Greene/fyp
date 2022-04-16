const router = require('express').Router();
const { json } = require('express');
const patient_service = require('../services/patient_service.js');
const moment = require('moment');


// router.get('/:url', (req, res) => {


//   const url = req.params.url;

//   console.log(url);

//   if (typeof url === 'undefined') {
//     res.statusMessage = "Bad Request - missing url"
//     res.status(400).json({ content: 'error' });
//   }

//   try {
//     const result = patient_service.getPatientInfoByUrl(url);

//     res.json(result);

//   } catch (err) {
//     res.status(500);
//     res.send(err.message);
//   }

// });

// add in :url
router.get('/individual/:url', (req, res) => {

  patientData = loadIndividualPatientInfo(req.params.url);

  console.log(patientData);

  //When passing the patientData object into the calculateCurrentWaitingTime fucntion, it logs as undefined, but still has it's object attributes, further investigation needed.
  //Solution - In the layout.pug file I had set the body to have a background image. But the image was being sent in the HTTP request body along with the URL, essentially sending two requests. Fun 45 minutes to find this.
  let waitingTimeCalc = calculateCurrentWaitingTime(patientData);

  console.log(waitingTimeCalc);

  res.setHeader('content-type', 'text/html');
  res.render('../public/individual.pug', { patient: patientData, waitingTimeCalc: waitingTimeCalc });

})

function loadIndividualPatientInfo(url) {
  const result = patient_service.getPatientInfoByUrl(url);
  return result;
}

function calculateCurrentWaitingTime(patientData) {

  /*
  if(patientData.arrival_date === undefined) {
    console.log("patientData.arrival_date is `undefined`");
  } else {
    console.log("HERE:", patientData.arrival_date);
  }
  if(!patientData.hasOwnProperty('arrival_date')) {
    console.log("arrival_date does not exist");
  } else {
    console.log("arrival_date exists");
  }
  console.log(typeof(patientData.arrival_date));
  */
  //console.log(typeof(patientData));

  var stringPatientDateTime = patientData.arrival_date + ' ' + patientData.arrival_time;
  var datePatientDateTime = new Date(stringPatientDateTime)
  var dateCurrentDateTime = moment().toDate();
  let timeWaiting = addPatientWaitingTime(dateCurrentDateTime, datePatientDateTime);
  return timeWaiting

}

function addPatientWaitingTime(dateCurrentDateTime, datePatientDateTime) {
  let diffInMilliSeconds = Math.abs(dateCurrentDateTime - datePatientDateTime) / 1000;

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

// export
module.exports = router;