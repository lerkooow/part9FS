import { Patient } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import patientService from "../../services/patients";

const PatientInfo = () => {
  const [patientsId, setPatientsId] = useState<Patient[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientService.getById(String(id));
        setPatientsId([patientData]);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const patient = patientsId.find(p => p.id === String(id));

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
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientInfo;

