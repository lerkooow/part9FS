import express from 'express';
import patientService from '../services/patentsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;