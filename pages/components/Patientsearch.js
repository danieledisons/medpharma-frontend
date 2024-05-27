import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";

const Patientsearch = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbDFAZ21haWwuY29tIiwiaWF0IjoxNzE2NzYyODU4fQ.TadGOblOdnOkfbCVZykgCjEMMC4-lcRRh1jceBW6QZg";
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    patientDetails: null,
  });
  const [loading, setLoading] = useState(false);

  const getPatientDetails = async (firstName, lastName) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/get-patient-details`,
        {
          params: {
            firstName,
            lastName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData({ ...data, patientDetails: response.data });
      console.log("RESPONSE>>>", response.data);
    } catch (error) {
      console.error("Error fetching patient details:", error.response.data);
      throw error;
    }
  };

  console.log(
    "Patient Details>>>",
    data?.patientDetails?.patient.patientFirstName
  );

  const handleSearch = () => {
    const { firstName, lastName } = data;
    if (firstName && lastName) {
      getPatientDetails(firstName, lastName);
    }
  };

  return (
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
      <div style={{ fontWeight: "bold", fontSize: 24 }}>Search for Patient</div>
      <CardContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              style={{ marginBottom: 16, minHeight: 46 }}
              fullWidth
              id="firstName"
              label="Enter Patient First Name"
              variant="outlined"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ marginBottom: 16, minHeight: 46 }}
              fullWidth
              id="lastName"
              label="Enter Patient Last Name"
              variant="outlined"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSearch}
              style={{ backgroundColor: "#4F46E5" }}
            >
              Search
            </Button>
          </Grid>
          {data?.patientDetails && (
            <div
              style={{
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
                minWidth: "100%",
              }}
            >
              <Card
                style={{
                  borderWidth: "1px solid green",
                  width: "50%",
                  padding: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="outlined"
              >
                <div style={{ fontWeight: "bold" }}>Patient Details</div>
                <CardContent>
                  <div>
                    Name: {data?.patientDetails?.patient.patientFirstName}{" "}
                    {data?.patientDetails?.patient.patientLastName}
                  </div>
                  <div>Consultations:</div>
                  <ul>
                    {data?.patientDetails?.patient?.consultations?.map(
                      (consultation, index) => (
                        <>
                          <li key={index}>
                            Medical Condition: {consultation?.medicalCondition}
                          </li>
                          <li key={index}>
                            Date: {consultation?.consultationDate}
                          </li>
                        </>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Patientsearch;
