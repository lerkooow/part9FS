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

const addPatientor = (
  name: string, dateOfBirth: string, gender: Gender, occupation: string
): PatientEntry => {

const newDiaryEntry = {
  id: uuidv4(),
  name,
  dateOfBirth,
  ssn: 'dummy',
  gender,
  occupation,
};

diagnoses.push(newDiaryEntry);
return newDiaryEntry;
};

export default {
  getNonSensitiveEntries,
  addPatientor
};