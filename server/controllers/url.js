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

  let waitingTimeCalc = calculateCurrentWaitingTime(patientData);

  res.setHeader('content-type', 'text/html');
  res.render('../public/individual.pug', { patient: patientData, waitingTimeCalc: waitingTimeCalc});

})

function loadIndividualPatientInfo(url) {

  const result = patient_service.getPatientInfoByUrl(url);
  return result;


  //   console.log("1", window.location.href);
  //   const patients = await api.getDataAsync(`${api.INDIVIDUAL_URL}`);
  //   console.log(`${api.INDIVIDUAL_URL}/$2b$10$IX9eamTVNhkc2Hmq.IKzI.iVXENsJWHdlhNA1625t65QsNBaa8LmG`);
  //   console.log(typeof(patients));
  //   //addTimeToPatientObject(patients);
  //   displayPatients(patients);

  
  }

function calculateCurrentWaitingTime(patientData) {

  var DateCurrentDateTime = moment().toDate();

  console.log(DateCurrentDateTime);

  var stringPatientDateTime = (patientData.arrival_date + ' ' + patientData.arrival_time);
  var datePatientDateTime = new Date(stringPatientDateTime)

  console.log(datePatientDateTime);

  let timeWaiting = addPatientWaitingTime(DateCurrentDateTime, datePatientDateTime);

  return timeWaiting

}

function addPatientWaitingTime(DateCurrentDateTime, datePatientDateTime) {
  let diffInMilliSeconds = Math.abs(DateCurrentDateTime - datePatientDateTime) / 1000;

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