import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function LatestPost() {
    const [Title, setTitle] = useState("Latest Post");
    const [Body, setBody] = useState("**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  It is a long established fact that a reader will be distracted by the readable Body of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Body here, Body here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).");
    const [Link, setLink] = useState("/");

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/last`, {method: 'GET', headers: { 'Content-Type': 'application/json' },})
            .then(response => { 
                if(!response.ok){ 
                    throw new Error(`HTTP ${response.status}`)
                }
                return response.json()
            } )
            .then(data => {
                setTitle(data[0].title); // Setting state from the results
                setBody(data[0].body);
                setLink("/posts/" + data[0]._id);
            })
            .catch(error => {console.log(error); setTitle('[Error] Failed to fetch post')});
    })
  
    return (
    <Paper variant="outlined">
        <Container sx={{paddingTop: "0.5vh"}}>
            <Typography variant="h3" component="h2" textAlign="center"> {Title} </Typography>
            <Divider />
            <Typography variant="body1" textAlign="justify" sx={{maxHeight: '800px', overflow: 'hidden'}}>
                <ReactMarkdown children={Body}/>
            </Typography>
            <Button variant="contained" sx={{mt: "1vh", marginBottom: "1vh"}} href={Link}>Read more</Button>
        </Container>
        
    </Paper>
  )
}
