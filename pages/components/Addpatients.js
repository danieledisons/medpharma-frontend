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

export default function Addpatients() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbDFAZ21haWwuY29tIiwiaWF0IjoxNzE2NzYyODU4fQ.TadGOblOdnOkfbCVZykgCjEMMC4-lcRRh1jceBW6QZg";
  const [data, setData] = useState({
    patientFirstName: "",
    patientLastName: "",
    email: "",
    weight: "",
    gender: "",
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
    setLoading(true);
    setTriggerSuccess(false);
    console.log(data);
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3002/add-patient",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", result.status, result.data);
      if (result.status === 200) {
        setTriggerSuccess(true);
        setLoading(false);
        setData({
          patientFirstName: "",
          patientLastName: "",
          email: "",
          weight: "",
          gender: "",
        });
      }
    } catch (error) {
      setLoading(true);
      console.error("Error posting data:", error);
    }
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
          You have successfully added patient information
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
        <div style={{ fontWeight: "bold", fontSize: 24 }}>Add Patients</div>
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
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={data.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, minHeight: 46 }}
                  fullWidth
                  id="weight"
                  name="weight"
                  label="Weight (kg)"
                  variant="outlined"
                  value={data.weight}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginBottom: 16, maxHeight: 46 }}
                  fullWidth
                  id="gender"
                  name="gender"
                  label="Gender"
                  variant="outlined"
                  value={data.gender}
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
                >
                  Add Patient
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
