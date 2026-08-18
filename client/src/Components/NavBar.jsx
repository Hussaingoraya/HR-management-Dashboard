import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  PersonAdd,
  Brightness4,
  Brightness7,
  Person,
} from "@mui/icons-material";
import { ThemeContext } from "../Context/ThemeContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Have a nice day !!")
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <AppBar
        position="static"
        color={darkMode ? "default" : "primary"}
        sx={{ backgroundColor: "#1976d2" }}
      >
        <Toolbar>
          {/* App Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Employee Management Dashboard
          </Typography>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<Home />}
            >
              Home
            </Button>
            <Button color="inherit" onClick={logout} startIcon={<Person />}>
              LogOut
            </Button>
            {/* Theme Toggle Button */}
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
