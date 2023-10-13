import diagnoseData from '../data/diagnostics.json';
import { Diagnosis } from "../types"
const diagnoses: Diagnosis[] = diagnoseData;

const getEntries = ():Diagnosis[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin
  }));
};

export default{
  getEntries
};