
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

// POST - Insert a new patient.
// This async function sends a HTTP post request
router.post("/", async (req, res) => {
  // the request body contains the new patient values - copy it
  const newPatient = req.body; // show what was copied in the console (server side)
  console.log('HELLO! ', newPatient);
  try {
    // Use the service to create the new patient
    // If all goes well, return the result 
    result = await patient_service.addOrUpdatePatient(newPatient);
    console.log('new: ', result);
    res.json(result); 
  
  // Otherwise handle server (status 500) errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// PUT update patient
// Like post but patientID is provided and method = put
router.put('/:id', async (req, res) => {
  const patientId = req.params.id;
  res.json(`This will update patient with id = ${patientId}`);
});

// DELETE single task.
router.delete('/:id', async (req, res) => {
  const patientId = req.params.id;
  res.json(`This will delete patient with id = ${patientId}`);
});


// export
module.exports = router;