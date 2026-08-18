import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Save, ArrowBack } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const AddEmployee = () => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/employees/${id}`,
          );
          setFormdata(response.data.data);
        } catch (error) {
          toast.error("Failed to load employee data");
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/employees/${id}`, formData);
        toast.success("Employee Updated Succesfully");
      } else {
        const submitForm = await axios.post(
          "http://localhost:5000/api/employees",
          formData,
        );
        console.log("Response", submitForm.data);
        toast.success("Employee Added Succesfully");
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast("Unable to add Employee", error);
    }
  };

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Top Header & Back Button */}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px", // mb={3} matlab 24px hota hai (3 * 8px)
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="primary">
              {id ? "Edit Employee" : "Add New Employee"}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              component={Link}
              to="/"
            >
              Back
            </Button>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Save />}
              // disabled={loading}
            >
              {id ? "Update Employee" : "Save Employee"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AddEmployee;
