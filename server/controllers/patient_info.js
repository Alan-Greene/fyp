
const router = require('express').Router();
const { json } = require('express');
const patient_service = require('../services/patient_service.js');

router.get('/', function (req, res){

    try {
        const result = patient_service.getPatientInfo();
        res.json(result);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }

});

router.get('/triage', function (req, res){
  let patientArray = new Array();
  try {
      const triageOne = patient_service.getLastTenTriageOne();
      const triageTwo = patient_service.getLastTenTriageTwo();
      const triageThree = patient_service.getLastTenTriageThree();
      const triageFour = patient_service.getLastTenTriageFour();
      const triageFive = patient_service.getLastTenTriageFive();
      patientArray.push(triageOne, triageTwo, triageThree, triageFour, triageFive)
      res.json(patientArray);
  } catch (err) {
      res.status(500);
      res.send(err.message);
  }

});

router.get('/:id', (req, res) => {

    // read values from req
    const id = req.params.id;
  
    // If params are missing return 400
    if (typeof id === 'undefined') {
      res.statusMessage = "Bad Request - missing id"
      res.status(400).json({ content: 'error' });
    }
  
    try {
      // Call the service
      const result = patient_service.getPatientInfoById(id);
  
      // Send response back to client
      res.json(result);
  
      // Catch and send errors  
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  
  });

// export
module.exports = router;