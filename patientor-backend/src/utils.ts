/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Diagnosis, NewPatientEntry, NewEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string=> {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing text: ${text}`);
  }
  return text;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing visibility: ' + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || !Array.isArray(object)) {
    console.error('Invalid object:', object);
    return [] as Array<Diagnosis['code']>;
  }

  return object as Array<Diagnosis['code']>;
};

const parseNumber = (number: unknown): number => {
  if (typeof number !== 'number' && !(number instanceof Number)) {
    throw new Error(`Incorrect or missing number: ${number}`);
  }
  return Number(number);
};

const toPatientEntry = (object: unknown): NewPatientEntry => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object )  {
    const newPatientEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };

    return newPatientEntry;
  }

  throw new Error(`Incorrect data: a field missing`);
};

const toEntry = (object: unknown): NewEntry => {
console.log("🚀 ~ file: utils.ts:77 ~ toEntry ~ object:", object)

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'healthCheckRating' in object && 'employerName' in object && 'startDate' in object && 'endDate' in object)  {
    const newEntry: NewEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      healthCheckRating: parseNumber(object.healthCheckRating),
      employerName: parseString(object.employerName),
      type: "OccupationalHealthcare",
      sickLeave: {
        startDate: object.startDate as string | undefined,
        endDate: object.endDate as string | undefined,
      }
  };

    return newEntry;
  }

  throw new Error(`Incorrect data: a field missing`);
};

export { toPatientEntry, parseDiagnosisCodes, toEntry };
