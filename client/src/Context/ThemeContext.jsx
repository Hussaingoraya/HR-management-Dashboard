import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// 1. Context Create karna
export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle function jo mode change karega
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // MUI ka theme generate karna base on darkMode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    // 2. Provider ke zariye state aur function poori app ko pass karna
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ye background color auto adjust karta hai */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};