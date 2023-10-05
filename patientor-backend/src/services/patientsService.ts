import patientData from '../data/patient.json';
import { PatientEntry, NonSensitivePatientEntry, Gender } from "../types";
const { v4: uuidv4 } = require('uuid');


const diagnoses: PatientEntry[] = patientData.map(({ gender, ...rest }) => ({
  ...rest,
  gender: gender as Gender,
}));

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return diagnoses.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatientor = (data: Omit<PatientEntry, 'id'>): PatientEntry => {
  const id: string = uuidv4();
  const newEntry = { id, ...data };

  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatientor
};