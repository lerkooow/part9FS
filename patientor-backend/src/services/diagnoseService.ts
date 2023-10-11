import diagnoseData from '../data/diagnostics.json';
import { DiagnoseEntry } from "../types"
const diagnoses: DiagnoseEntry[] = diagnoseData;

const getEntries = ():DiagnoseEntry[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin
  }));
};

export default{
  getEntries
};