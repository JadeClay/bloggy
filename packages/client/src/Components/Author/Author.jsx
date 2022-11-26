import { Avatar, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

export default function Author() {
    const [author, setAuthor] = React.useState({author: null, description: null});

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/author.json`, 
      {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json()).then(res =>  setAuthor(res));

  }, [])
    return (
    <Stack>
        <Avatar
        alt={author.author}
        src={`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/images/profile.jpg`}
        sx={{ width: '15vh', height: '15vh', marginLeft: '40%', mb: 2 }}
        />
        <Divider variant='middle'/>
        <Typography align='center' variant='h4' sx={{ mt: 1 }}> {author.author} </Typography>
        <Typography variant="body1" component="h2" textAlign="justify"><ReactMarkdown children={author.description} />  </Typography>
    </Stack>

  )
}
