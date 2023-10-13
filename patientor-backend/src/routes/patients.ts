import express from 'express';
import patientService from '../services/patientsService';
import { toPatientEntry, toEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const data = toPatientEntry(req.body);
  const newEntry = patientService.addPatientor(data);

  res.json(newEntry);
});


router.get('/:id', (req, res) => {
  const diary = patientService.findById(req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const data = toEntry(req.body);
  const newEntry = patientService.addEntries(data);

  res.json(newEntry);
});

export default router;