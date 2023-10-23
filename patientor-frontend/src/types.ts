export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Entry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes: string[];
  healthCheckRating: number;
  employerName: string;
}


export interface HospitalEntry extends Entry {
  type: "Hospital";
  discharge: {
      date: string;
      criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends Entry {
  type: "OccupationalHealthcare";
  sickLeave?: {
      startDate?: string;
      endDate?: string;
  };
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: (HospitalEntry | OccupationalHealthcareEntry)[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

// one

export type FormEntries = Omit<Entry, 'id'> | OccupationalHealthcareEntry | { startDate?: string; endDate?: string };

