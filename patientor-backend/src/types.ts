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

export interface Entry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes: string[];
    healthCheckRating: number;
}

export interface HospitalEntry extends Entry {
    type: "Hospital";
    description: string;
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry extends Entry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
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
export type NewEntry = Omit<Entry, 'id'>;



