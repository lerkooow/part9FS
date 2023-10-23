import axios from "axios";
import { Diagnosis, Patient, PatientFormValues, FormEntries, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntries = async (object: FormEntries, id: string) => {
  try {
    const { data } = await axios.post<Entry[]>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );
    return data;
  } catch (error) {
    console.error("Error creating entries:", error);
    throw error;
  }
};

const getEntries = async (id: string) => {
  const { data } = await axios.get<{entries: Entry[]}>(
    `${apiBaseUrl}/patients/${id}/entries`
  );

  return data.entries;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getById, getDiagnoses, createEntries, getEntries
};

