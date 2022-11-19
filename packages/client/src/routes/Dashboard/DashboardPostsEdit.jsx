import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Stack } from '@mui/system';
import MDEditor from '@uiw/react-md-editor';

export default function DashboardPostsEdit() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.value);
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [title, setTitle] = React.useState("New Post!");
  const [body, setBody] = React.useState("**New Post!!!**");

  useEffect(() => { // Fetching the post from the API
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/find/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          setTitle(response.PostLooked.title);
          setBody(response.PostLooked.body);
        } else {
          console.log(response.message);
          setTitle("Failed to fetch...");
          setBody("There has been an error in our end trying to fetch the post...");
        }
      });
  },[])

  const startAlert = () => {
    setAlert(true);
  };

  const startSuccess = () => {
    setSuccess(true);
  }

  const handleAlert = (event, reason) => {
    if (reason === 'clickaway') {
      setAlert(false);
      setSuccess(false);
      return;
    }

    setAlert(false);
    setSuccess(false);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/edit/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'title': title,
        'body': body
      }),
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          startSuccess();
        } else {
          startAlert();
        }
      });
    
  }

  if(user.user != null || user.token != null){
    return (
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <AdminSidebar selectedElement={1}/>
        </Grid>

        <Grid item xs={11} sx={{marginLeft: {xs: '15vw', md: 0}}}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h3" textAlign={"left"} sx={{paddingTop: 3}}><EmojiPeopleIcon sx={{fontSize: 'inherit'}}/> Hello, {user.user}!</Typography>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={success} autoHideDuration={6000} onClose={handleAlert}>
                <Alert onClose={handleAlert} severity="success" sx={{ width: '100%' }}>
                  The post was edited succesfully!
                </Alert>
              </Snackbar>
        
              <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlert}>
                <Alert onClose={handleAlert} severity="error" sx={{ width: '100%' }}>
                  There has been an error editing the post!
                </Alert>
              </Snackbar>
        
              <form method='PATCH' onSubmit={handleEdit}>
                <Stack sx={{width: "100%"}}>
                    <Box sx={{width: "90%"}}>
                      <TextField
                        required
                        id="standard-required"
                        label="Post Title"
                        defaultValue={title}
                        variant="standard"
                        sx={{width: "100%", marginBottom: "2vh"}}
                        onChange={handleTitle}
                      />
                    </Box>
                    <div data-color-mode="dark" style={{ width: '90%'  }}>
                        <MDEditor
                            value={body}
                            onChange={setBody}
                            visibleDragbar={false}
                            height={"50vh"}
                        />
                    </div>
        
                    <Box sx={{width: {xs: 'auto', md: "19%"}, ml: {xs: 0, md: "auto"}, mt: "2vh"}}>
                      <Button variant="contained" type="submit">Edit post</Button>
                    </Box>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }else{
    console.log(user);
    return <Navigate to="/" />
  } 

}
