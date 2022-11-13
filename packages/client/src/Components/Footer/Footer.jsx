import { Alert, Box, Button, Container, Divider, Grid, Link, Modal, Snackbar, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import BloggyIcon from '../Icons/BloggyIcon'
import LinkBehavior from '../LinkBehavior'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../app/reducers/userSlice'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function LoginModal({setUser}) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState(false); // For enabling and disabling alert
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const Navigate = useNavigate();
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const startAlert = () => {
      setAlert(true);
    };
  
    const handleAlert = (event, reason) => {
      if (reason === 'clickaway') {
        setAlert(false);
        return;
      }
  
      setAlert(false);
    };
  

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
             'username': username,
             'password': password
            }),
        })
        .then(response => response.json())
        .then(response => {
            if(response.success === true){
                console.log('Connection Succesfully');
                if(error) setError(false);
                setOpen(false);
                dispatch(login({ user: response.username, token: response.token}))
                startAlert();
                Navigate('/dashboard');
            } else {
                setError(true);
                setErrorMessage(response.message);
            }
        });

        e.preventDefault();

    }
    return (
      <Box sx={{mt: 2}}>
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlert}>
            <Alert onClose={handleAlert} severity="success" sx={{ width: '100%' }}>
                You have logged in succesfully!
            </Alert>
        </Snackbar>
        <Button onClick={handleOpen} startIcon={<AdminPanelSettingsIcon />}>Admin Panel</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Log-in
            </Typography>
            <Container>
                <form method='POST' onSubmit={handleSubmit}>
                    <Stack sx={{mt: 2}} spacing={2}>
                        {error && <TextField error id="filled-basic" label="Username" variant="filled" name='username' onChange={handleUsername} helperText={errorMessage} /> }
                        {error && <TextField error id="filled-basic" label="Password" variant="filled" name='password' type='password' onChange={handlePassword}/>}
                        {!error && <TextField id="filled-basic" label="Username" variant="filled" name='username' onChange={handleUsername}/>}
                        {!error && <TextField id="filled-basic" label="Password" variant="filled" name='password' type='password' onChange={handlePassword}/>}
                        <Button type='submit'>Submit</Button>
                    </Stack>
                </form>
            </Container>
          </Box>
        </Modal>
      </Box>
    );
}
  

export default function Footer(setUser) {
  return (
    <Grid container sx={{
        paddingTop: '2vh',
        marginTop: '2vh',
        paddingX: '1vw',
        backgroundColor: '#202121',
        marginBottom: 0,
    }} spacing={2}>
        <Grid item xs={12} md={4}>
            <Stack sx={{paddingLeft: 2}}>
                <BloggyIcon sx={{fontSize: '30vh', height: 60}}/>

                <LoginModal setUser={setUser}/>
            </Stack>
        </Grid>
        <Divider />
        <Grid item xs={12} md={8}>
            <Stack sx={{paddingLeft: {xs: 2, md: 0}}}>
                <Link component={LinkBehavior} link={"/test"} underline={"hover"} color={'inherit'}>Admin Panel</Link>
                <Link component={LinkBehavior} link={"/test"} underline={"hover"} color={'inherit'}>Admin Panel</Link>
            </Stack>
        </Grid>
        <Grid item xs={12} sx={{
            paddingBottom: '2vh',
            textAlign: 'center'
        }} >
            <Divider variant='middle'/>
            <Box sx={{
                paddingTop: '2vh'
            }}>
                <Link align='inherit' underline='hover' color='inherit' href='https://jadeclay.github.io' target='_blank'>&#169; 2022. Developed by Oscar Piña</Link>
            </Box>
        </Grid>
    </Grid>
  )
}