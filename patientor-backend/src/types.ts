export interface Diagnosis {
    code:string;
    name:string;
    latin?:string;
}

export enum Gender {
    male="male",
    female="female",
    other="other"
}

type EntryType = "Hospital" | "OccupationalHealthcare";

export interface Entry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes: string[];
    healthCheckRating: number;
    employerName: string;
    type: EntryType;
}

export interface HospitalEntry extends Entry {
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry extends Entry {
    sickLeave?: {
        startDate?: string;
        endDate?: string;
    };
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    ssn: string;
    occupation: string;
    entries: (HospitalEntry | OccupationalHealthcareEntry)[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewEntry = Omit<Entry, 'id'> | OccupationalHealthcareEntry;
export type typeHospital = Omit<HospitalEntry, 'type'>;
export type Entries = Omit<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'ssn' | 'occupation'>;




