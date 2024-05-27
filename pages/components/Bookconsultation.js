import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

export default function BookConsultation() {
  const [data, setData] = useState({
    patientFirstName: "",
    patientLastName: "",
    consultationDate: "",
    consultationNotes: "",
    medicalCondition: "",
  });

  const [triggerSuccess, setTriggerSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbDFAZ21haWwuY29tIiwiaWF0IjoxNzE2NzYyODU4fQ.TadGOblOdnOkfbCVZykgCjEMMC4-lcRRh1jceBW6QZg";
    setLoading(true);
    setTriggerSuccess(false);
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3002/add-consultation",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", result.status, result.data);
      if (result.status === 201) {
        setTriggerSuccess(true);
        setLoading(false);
        setData({
          patientFirstName: "",
          patientLastName: "",
          consultationDate: "",
          consultationNotes: "",
          medicalCondition: "",
        });
      }
    } catch (error) {
      setLoading(true);
      console.error("Error posting data:", error);
    }
  };

  const isFormValid = () => {
    return Object.values(data).every((field) => field.trim() !== "");
  };

  return (
    <>
      {triggerSuccess ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => {
            setTriggerSuccess(false);
          }}
        >
          You have successfully booked a consultation
        </Alert>
      ) : null}

      <Card
        style={{
          borderWidth: "1px solid green",
          width: "100%",
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="outlined"
      >
        <div style={{ fontWeight: "bold", fontSize: 24 }}>
          Create or Book Consultations
        </div>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, minHeight: 46 }}
                  fullWidth
                  id="patientFirstName"
                  name="patientFirstName"
                  label="Patient First Name"
                  variant="outlined"
                  value={data.patientFirstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, minHeight: 46 }}
                  fullWidth
                  id="patientLastName"
                  name="patientLastName"
                  label="Patient Last Name"
                  variant="outlined"
                  value={data.patientLastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, minHeight: 46 }}
                  fullWidth
                  id="consultationDate"
                  name="consultationDate"
                  label="Date"
                  variant="outlined"
                  type="date"
                  value={data.consultationDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, minHeight: 46 }}
                  fullWidth
                  id="consultationNotes"
                  name="consultationNotes"
                  label="Consultation Notes"
                  variant="outlined"
                  value={data.consultationNotes}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, maxHeight: 46 }}
                  fullWidth
                  id="medicalCondition"
                  name="medicalCondition"
                  label="Medical Condition"
                  variant="outlined"
                  value={data.medicalCondition}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: 8 }}>
              {!loading ? (
                <Button
                  type="submit"
                  style={{ backgroundColor: "#4F46E5" }}
                  variant="contained"
                  disabled={!isFormValid()}
                >
                  Book Consultation
                </Button>
              ) : (
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
