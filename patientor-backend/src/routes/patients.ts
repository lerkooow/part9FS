import express from 'express';
import patientService from '../services/patientsService';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation } = req.body;
  const addedEntry = patientService.addPatientor(
    name,
    dateOfBirth,
    gender,
    occupation
  );
  res.json(addedEntry);
});

export default router;