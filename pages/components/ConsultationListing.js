import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

function ConsultationListing() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbDFAZ21haWwuY29tIiwiaWF0IjoxNzE2NzYyODU4fQ.TadGOblOdnOkfbCVZykgCjEMMC4-lcRRh1jceBW6QZg";
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchConsultations = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3002/view-all-consultations",
        {
          params: {
            pageSize: pageSize,
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConsultations((prevConsultations) => [
        ...prevConsultations,
        ...response.data.consultations,
      ]);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchConsultations = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3002/searchconsultations",
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConsultations(response.data);
    } catch (error) {
      console.error("Error searching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations(page);
  }, [page]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      searchConsultations(query);
    } else {
      setConsultations([]);
      setPage(1);
      fetchConsultations(1);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
      <div style={{ fontWeight: "bold", fontSize: 24 }}>
        Consultation Listing
      </div>
      <CardContent>
        <TextField
          style={{ marginBottom: 16, minHeight: 46 }}
          fullWidth
          id="outlined-basic"
          label="Search by date, patient name, provider"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Patient First Name</TableCell>
                <TableCell>Patient Last Name</TableCell>
                <TableCell>Consultation Date</TableCell>
                <TableCell>Medical Condition</TableCell>
                <TableCell>Consultation Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultations.length > 0
                ? consultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell>
                        {consultation.data.patientFirstName}
                      </TableCell>
                      <TableCell>{consultation.data.patientLastName}</TableCell>
                      <TableCell>
                        {consultation.data.consultationDate}
                      </TableCell>
                      <TableCell>
                        {consultation.data.medicalCondition}
                      </TableCell>
                      <TableCell>
                        {consultation.data.consultationNotes}
                      </TableCell>
                    </TableRow>
                  ))
                : !loading && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Results not found
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={loadMore}
            style={{ backgroundColor: "#4F46E5" }}
            disabled={searchQuery !== ""}
          >
            Load More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConsultationListing;
