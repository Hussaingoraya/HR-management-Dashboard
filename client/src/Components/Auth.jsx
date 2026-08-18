import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Password } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isLogin, setisLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endPoints = isLogin ? "api/users/login" : "api/users/signup";
    try {
      const submitForm = await axios.post(
        `http://localhost:5000/${endPoints}`,
        formData,
      );
      console.log("Response", submitForm.data);

      if (isLogin) {
        if (submitForm.data.token) {
          localStorage.setItem("token", submitForm.data.token);
        }

        toast.success("Login Successful!");
        navigate("/dashboard");
      } else {
        toast.success("Account Created Successfully! Please login now.");
        setisLogin(true);
        
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            p: 3,
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <CardContent>
            {/* Title */}
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              {isLogin ? "Welcome Back" : "Create an Account"}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              sx={{ mb: 3 }}
            >
              Please login to your account
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Username"
                  name="userName"
                  value={formData.userName}
                  type="text"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                />
              )}

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                type="email"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                type="password"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>

            {/* Toggle Link */}
            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => setisLogin(!isLogin)}
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
