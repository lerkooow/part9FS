import {  TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem, Stack, Alert} from '@mui/material';
import { useEffect, useState } from "react";
import patientService from "../../services/patients"
import { Entry, FormEntries } from '../../types';
import { useParams } from 'react-router-dom';


const FormEntry = ({handleFetchPatient} : {handleFetchPatient : () => void}) => {
  const [entrieses, setEntrieses] = useState<Entry[]>([]);
  console.log("🚀 ~ file: Form.tsx:10 ~ FormEntry ~ entrieses:", entrieses)
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);


  const { id } = useParams();


  const clearForm = () => {
    setDate("");
    setSpecialist("");
    setDescription("");
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
    setEmployerName("");
    setStartDate("")
    setEndDate("")
  };

  const onCancel = () => {
    clearForm();
  };

  const fetchExistingEntries = async () => {
    try {
      const existingEntries = await patientService.getEntries(String(id));
      setEntrieses(existingEntries);
    } catch (error) {
      console.error("Error fetching existing entries:", error);
    }
  };

  useEffect(() => {
    fetchExistingEntries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitNewEntries = async (values: FormEntries, someId: string): Promise<void> => {
    try {
      await patientService.createEntries(values, someId);
    } catch (error) {
      console.error("Error submitting new entries:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: FormEntries = {
      date,
      specialist,
      description,
      diagnosisCodes,
      healthCheckRating,
      employerName,
      startDate,
      endDate
    };
    console.log("🚀 ~ file: Form.tsx:75 ~ handleSubmit ~ values:", values)



    await submitNewEntries(values, `${id}`);
    handleFetchPatient()
    clearForm();
  };

  useEffect(() => {
    if (!date || !specialist || !description || (diagnosisCodes.length === 0) || !employerName) {
      setError("Please fill in all required fields");
      setAlert(true)
    } else {
      setError("");
      setAlert(false)

    }
  }, [date, specialist, description, diagnosisCodes, employerName]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    },
  },
};

  const codes = [
    "M24.2",
    "M51.2",
    "S03.5",
    "J10.1",
    "J06.9",
    "Z57.1",
    "N30.0",
    "H54.7",
    "J03.0",
    "L60.1",
    "Z74.3",
    "L20",
    "F43.2",
    "S62.5",
    "H35.29"
  ];

    return (
        <div>
          {alert && <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>}
        <h2>New HealthCheck entry</h2>
        <form onSubmit={handleSubmit}>
          <TextField
          label="Description" variant="standard"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{marginBottom: "15px"}}
        />
        <label style={{color: "gray"}}>Date</label>
        <TextField
          variant="standard"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{marginBottom: "5px"}}
        />
        <TextField
          label="Specialist" variant="standard"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{marginBottom: "15px"}}
        />
        <FormControl variant="standard" fullWidth  style={{marginBottom: "10px"}}>
          <FormControl variant="standard">
            <InputLabel id="demo-customized-select-label">Healthcheck rating</InputLabel>
            <Select
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value as number)}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
        <FormControl fullWidth variant="standard">
        <InputLabel id="demo-multiple-name-label" style={{padding: "0px"}}>Diagnosis codes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={diagnosisCodes}
          MenuProps={MenuProps}
          onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
          style={{padding: "0px"}}
        >
          {codes.map((code) => (
            <MenuItem
              key={code}
              value={code}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <TextField
          label="Employee" variant="standard"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={{marginBottom: "15px"}}
        />
        <div><label style={{color: "gray"}}>Sickleave</label></div>
        <div style={{marginLeft: "15px", marginTop: "10px"}}>
          <label style={{color: "gray"}}>start</label>
          <TextField
          variant="standard"
          type="date"
          fullWidth
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
          style={{marginBottom: "5px"}}
          />
          <label style={{color: "gray"}}>end</label>
          <TextField
          variant="standard"
          type="date"
          fullWidth
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
          style={{marginBottom: "5px"}}
        />
      </div>

        <Grid>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              style={{ float: "left",
             marginTop: "10px",
                marginBottom: "50px"}}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            {!alert && <Button
              style={{
                float: "right",
                marginTop: "10px",
                marginBottom: "50px"
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>}
          </Grid>
        </Grid>
      </form>
    </div>
    )
}

export default FormEntry;
