import { Patient, Diagnosis } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Divider from '@mui/material/Divider';

import patientService from "../../services/patients";


const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientService.getById(String(id));
        setPatient(patientData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnose = await patientService.getDiagnoses();
        setDiagnoses(diagnose);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };
    fetchDiagnoses();
  }, []);

  if (!patient) {
    return (
      <div>
        <p>Patient not found</p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <EmojiPeopleIcon />
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.date}{entry.type === "OccupationalHealthcare" ? <WorkIcon/> : entry.type === "Hospital" ? <NextWeekIcon/> : <MedicalServicesIcon/> } <em>{entry.type === "OccupationalHealthcare" && entry.employerName}</em></p>
          <p><em>{entry.description}</em></p>
          {entry.healthCheckRating === 1 ? <FavoriteOutlinedIcon color="primary"/> : entry.healthCheckRating === 0 ?  <FavoriteOutlinedIcon color="success"/> : null}
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}
                </li>
              ))}
            </ul>
          ) : null}
          <p>diagnose by {entry.specialist}</p>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default PatientInfo;