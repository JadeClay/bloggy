import React from 'react';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

let DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#028090',
    },
    secondary: {
      main: '#00a896',
    },
  },
});

DarkTheme = responsiveFontSizes(DarkTheme);


function Root() {

  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />

      <Navbar/>

      <Outlet />

      <Footer />

    </ThemeProvider>

  );
}

export default Root;
