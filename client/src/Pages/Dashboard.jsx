import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const empData = await axios.get("http://localhost:5000/api/employees");
      console.log("empData", empData.data);
      const employeeResponse = empData.data.data;
      if (employeeResponse.length === 0) {
        toast.warning("No Employee Found");
      }
      setEmployee(employeeResponse);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to load employees!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployee(employees.filter((emp) => emp._id != id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee!");
    }
  };
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Top Header & Add Button */}
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px", // mb={3} matlab 24px hota hai (3 * 8px)
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Employee List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            component={Link}
            to="/add"
          >
            Add Employee
          </Button>
        </Box>

        {/* MUI Table */}
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow key={emp._id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>${emp.salary}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="warning"
                        component={Link}
                        to={`/edit/${emp._id}`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() =>handleDelete(emp._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
