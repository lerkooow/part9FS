/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, PatientEntry } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const paseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing date: ${text}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toPatientEntry = (object: any): Omit<PatientEntry, 'id'> => {
  return {
    name: paseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: paseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: paseString(object.occupation)
  };
};

export { toPatientEntry };