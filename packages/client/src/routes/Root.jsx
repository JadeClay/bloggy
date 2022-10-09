import React from 'react';
import { createTheme, CssBaseline, Grid, responsiveFontSizes, Stack, ThemeProvider } from '@mui/material';
import Navbar from "../Components/Navbar/Navbar";
import HeroImage from "../Components/HeroImage/HeroImage";
import LatestPost from '../Components/LatestPost/LatestPost';
import Posts from "../Posts";

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

      <Stack>
        <HeroImage title="Bloggy" subtitle="Free, open-source blog system"/>

        <Grid container spacing={2} rowSpacing={2} sx={{ marginTop: "1vh", paddingX: "2vw" }}>
          <Grid item xs={12} md={8}>
            <LatestPost/>
          </Grid>
          <Grid item xs={12} md={4}>
            <LatestPost/>
          </Grid>
        </Grid>
      </Stack>

    </ThemeProvider>

  );
}

export default Root;
