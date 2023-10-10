import patientData from '../data/patient.json';
import { Patient, NonSensitivePatient, Gender } from "../types";
const { v4: uuidv4 } = require('uuid');


const diagnoses: Patient[] = patientData.map(({ gender, ...rest }) => ({
  ...rest,
  gender: gender as Gender,
  entries: []
}));

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return diagnoses.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const addPatientor = (data: Omit<Patient, 'id'>): Patient => {
  const id: string = uuidv4();
  const newEntry = { id, ...data };

  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = diagnoses.find(d => d.id === id);
  return entry;
};

export default {
  getNonSensitiveEntries,
  addPatientor,
  findById
};