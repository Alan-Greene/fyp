const router = require('express').Router();
const { json } = require('express');
const patient_service = require('../services/patient_service.js');

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

  //const waiting_time = timenow - patientData.arrival_time;
  if (patientData.triage_date & patientData.triage_time !== null){
     
  }

  res.setHeader('content-type', 'text/html');
  res.render('../public/individual.pug', { patient: patientData});

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

// export
module.exports = router;