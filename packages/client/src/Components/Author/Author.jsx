import { Avatar, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import avatar from '../../static/images/author.jpg';
import ReactMarkdown from 'react-markdown';

export default function Author() {
    const [about, setAbout] = React.useState("**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  It is a long established fact that a reader will be distracted by the readable Body of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Body here, Body here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).")
  return (
    <Stack>
        <Avatar
        alt="Oscar Piña"
        src={avatar}
        sx={{ width: '15vh', height: '15vh', marginLeft: '40%', mb: 2 }}
        />
        <Divider variant='middle'/>
        <Typography align='center' variant='h4' sx={{ mt: 1 }}> Oscar Piña </Typography>
        <Typography variant="body1" component="h2" textAlign="justify"><ReactMarkdown children={about} />  </Typography>
    </Stack>

  )
}
