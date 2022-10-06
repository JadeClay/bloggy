import React from 'react';
import { createTheme, CssBaseline, responsiveFontSizes, Stack, ThemeProvider } from '@mui/material';
import Navbar from "./Navbar/Navbar.jsx";
import getDate from './util/date';
import HeroImage from "./HeroImage/HeroImage";

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

let currentDate = getDate;


function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />

      <Navbar date={currentDate}/>

      <Stack>
        <HeroImage title="Bloggy" subtitle="Free, open-source blog system"/>

        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>

      </Stack>

    </ThemeProvider>

  );
}

export default App;
