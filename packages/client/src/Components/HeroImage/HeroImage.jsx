import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';

export default function HeroImage() {
  const [info, setInfo] = React.useState({ name: "Bloggy", description: ""});

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/blog.json`, 
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()).then(res =>  setInfo(res));
  }, []);

  return (
    <Stack sx={{backgroundImage: `linear-gradient(to bottom, rgba(42, 44, 46, 0.7), rgba(42, 44, 46, 0.7)), url(http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/images/background.jpg)`, backgroundSize: "cover", height: "30vh",  justifyContent: "center"}}>
        
      <Typography variant="h3" component="h2" color={'white'} align="center">
          {info.name}
        </Typography>
        { info.description !== "" && // If there isn't any info.description, this child won't be rendered.
          <Typography variant="h5" component="h2" color={'white'} align="center"
            sx={{
              paddingTop: 1,
              mb: {xs:5, md: 0},
          }}>
            {info.description}
          </Typography>
        }
      </Stack>
    )
}
