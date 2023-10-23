import patientData from '../data/patient.json';
import { Patient, NonSensitivePatient, Gender, HospitalEntry, OccupationalHealthcareEntry, Entry, Entries } from "../types";
const { v4: uuidv4 } = require('uuid');

const diagnoses: Patient[] = patientData.map(({ gender, entries, ...rest }) => ({
  ...rest,
  gender: gender as Gender,
  entries: entries.map(entry => {
    if (entry.type === 'Hospital') {
      return entry as HospitalEntry;
    } else {
      return entry as OccupationalHealthcareEntry;
    }
  })
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

const getNonSensitivePatients = (): Entries[] => {
  return diagnoses.map(({ entries }) => ({
    entries
  }));
};


const addPatientor = (data: Omit<Patient, 'id'>): Patient => {
  const id: string = uuidv4();
  const newPatientor = { id, ...data };

  return newPatientor;
};

const addEntries = (data: Omit<Entry, 'id'>, patient: Patient): Entry => {
  const id: string = uuidv4();
  const newEntry = { id, ...data };
  patient.entries.push(newEntry)

  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = diagnoses.find(d => d.id === id);
  return entry;
};

const getNonSensitivePatientsById = (id: string): Entries | undefined => {
  const patient = findById(id);

  if (patient) {
    return {
      entries: patient.entries
    };
  } else {
    return undefined;
  }
};

export default {
  getNonSensitiveEntries,
  addPatientor,
  findById,
  addEntries,
  getNonSensitivePatients,
  getNonSensitivePatientsById,
};