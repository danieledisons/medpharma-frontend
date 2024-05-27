import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Link from "next/link";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3002/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Login successful:", response.data);
      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error?.response.data);
      setError(error?.response?.data.message);
    }
  };

  const handleForgetPassword = () => {
    console.log("Forget Password");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
      }}
    >
      <Card
        style={{
          width: 300,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="outlined"
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <CardContent>
          <TextField
            style={{ marginBottom: 16, minHeight: 46 }}
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            style={{ marginBottom: 12 }}
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/signup">
              <div>Sign up</div>
            </Link>
            <a href="#" onClick={handleForgetPassword}>
              Forget Password?
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {!loading ? (
              <Button
                style={{ backgroundColor: "#4F46E5" }}
                variant="contained"
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : (
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
            )}
          </div>
          {error && (
            <div style={{ marginTop: 10, textAlign: "center" }}>
              <Alert severity="error">{error}</Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
