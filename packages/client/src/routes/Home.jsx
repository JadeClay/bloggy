import { Grid } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import HeroImage from '../Components/HeroImage/HeroImage'
import LatestPost from '../Components/Posts/LatestPost'
import Author from '../Components/Author/Author'

export default function Home() {
  return (
    <Stack>
      <HeroImage title="Bloggy" subtitle="Free, open-source blog system"/>

      <Grid container spacing={3} rowSpacing={2} sx={{ marginTop: "1vh", paddingX: "2vw" }}>
        <Grid item xs={12} md={8}>
          <LatestPost/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Author />
        </Grid>
      </Grid>
    </Stack>

  )
}
