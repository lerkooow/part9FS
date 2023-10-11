import { Patient } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import patientService from "../../services/patients";

const PatientInfo = () => {
  const [patientsId, setPatientsId] = useState<Patient[]>([]);
  console.log("🚀 ~ file: patientInfo.tsx:11 ~ PatientInfo ~ patientsId:", patientsId)
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientService.getById(String(id));
        console.log("🚀 ~ file: patientInfo.tsx:18 ~ fetchPatient ~ patientData:", patientData)
        setPatientsId([patientData]);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const patient = patientsId.find(p => p.id === String(id));
  console.log("🚀 ~ file: patientInfo.tsx:27 ~ PatientInfo ~ patient:", patient)

  if (!patient) {
    return (
      <div>
        <p>Patient not found</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{patient.name} {patient.gender === "male" ? <MaleIcon /> : patient.gender === "female" ? <FemaleIcon/> : <EmojiPeopleIcon/>}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map(entry => (
      <div key={entry.id}>
        <p>{entry.date} <em>{entry.description}</em></p>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? <ul>
          {entry.diagnosisCodes.map((code) => (
          <li key={code}>{code}</li>
          ))}
          </ul> : null}
      </div>
    ))}
    </div>
  );
};

export default PatientInfo;

