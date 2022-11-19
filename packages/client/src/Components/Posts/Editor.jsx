import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { Stack } from "@mui/system";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";

// TO DO: Create all bussiness logic to create the post. Add a CREATE button and a Title field.

export default function Editor(author) {
  const [alert, setAlert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [title, setTitle] = React.useState("New Post!");
  const [body, setBody] = React.useState("**New Post!!!**");

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

  const handleSubmit = (e) => {
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'title': title,
        'author': author.author,
        'body': body
      }),
    }).then(response => response.json())
      .then(response => {
        if(response.success === true){
          console.log(response.message);
          startSuccess();
        } else {
          console.error(response.message);
          startAlert();
        }
      });
    console.log(e);
    e.preventDefault();
  }

  return (
    <>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleAlert}>
        <Alert onClose={handleAlert} severity="success" sx={{ width: '100%' }}>
          The post was created succesfully!
        </Alert>
      </Snackbar>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlert}>
        <Alert onClose={handleAlert} severity="error" sx={{ width: '100%' }}>
          There has been an error creating the post!
        </Alert>
      </Snackbar>

      <form method='POST' onSubmit={handleSubmit}>
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
              <Button variant="contained" type="submit">Create post</Button>
            </Box>
        </Stack>
      </form>
    </>
  );
}