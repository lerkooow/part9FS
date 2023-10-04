import patientData from '../data/pacific.json';
import { PatientEntry, NonSensitivePatientEntry } from "../types"
const diagnoses: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return diagnoses;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };

export default{
  getEntries,
  getNonSensitiveEntries
};