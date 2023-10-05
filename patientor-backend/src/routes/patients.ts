import express from 'express';
import patientService from '../services/patientsService';
import { toPatientEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const data = toPatientEntry(req.body);
  const newEntry = patientService.addPatientor(data);

  res.json(newEntry);
});

export default router;