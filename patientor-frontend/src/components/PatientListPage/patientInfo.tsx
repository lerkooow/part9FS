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
import { Grid, Button } from '@mui/material';

import patientService from "../../services/patients";
import FormEntry from "./Form";


const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [newData, setNewData] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFetchPatient = async () => {
    const patientData = await patientService.getById(String(id));
        setPatient(patientData);
        setNewData(false)
  }

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        handleFetchPatient();
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div>
     {newData &&  <FormEntry handleFetchPatient={handleFetchPatient}/>}
      <div>
        {newData ? <h2 style={{paddingTop: "80px"}}>Entries</h2>
        : <h2>Entries</h2>}
        <Divider />
      </div>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.date}{entry.type === "OccupationalHealthcare" ? <WorkIcon/> : entry.type === "Hospital" ? <NextWeekIcon/> : <MedicalServicesIcon/> } <em>{entry.employerName}</em></p>
          <p><em>{entry.description}</em></p>
          {entry.healthCheckRating === 1 ? <FavoriteOutlinedIcon color="primary"/> : entry.healthCheckRating === 0 ?  <FavoriteOutlinedIcon color="success"/> : entry.healthCheckRating === 2 ? <FavoriteOutlinedIcon color="error"/> : null}
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}
                </li>
              ))}
            </ul>
          ) : null}
          {entry.type === "OccupationalHealthcare" && entry.sickLeave && entry.sickLeave.startDate && entry.sickLeave.endDate ? (
          <div>
            <h3>Sickleave:</h3>
            <p>Start date: <em>{entry.sickLeave.startDate}</em></p>
            <p>End date: <em>{entry.sickLeave.endDate}</em></p>
            </div>
            ) : null}
          <Divider />
        </div>
      ))}
      <Grid item>
            <Button
              style={{
                float: "left",
                marginTop: "10px",
                marginBottom: "50px"
              }}
              type="submit"
              variant="contained"
              onClick={() => setNewData(!newData)}
            >
              Add New Entry
            </Button>
          </Grid>
    </div>
    </div>
  );
};

export default PatientInfo;