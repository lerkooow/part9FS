export interface DiagnoseEntry {
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
    diagnosisCodes: Code[];
}

export interface Code {
    diagnosisCodes: string;
}

export interface HospitalEntry extends Entry {
    type: "Hospital";
    diagnosisCodes: Code[];
    description: string;
    discharge: {
        date: string;
        criteria: string;
    };
    healthCheckRating: number;
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


