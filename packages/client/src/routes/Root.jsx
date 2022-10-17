import React, { useEffect, useContext, useCallback } from 'react';
import { createTheme, CssBaseline, Grid, responsiveFontSizes, Stack, ThemeProvider } from '@mui/material';
import Navbar from "../Components/Navbar/Navbar";
import HeroImage from "../Components/HeroImage/HeroImage";
import LatestPost from '../Components/LatestPost/LatestPost';
import { UserContext } from '../Context/UserContext';

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
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/refreshToken`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

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
