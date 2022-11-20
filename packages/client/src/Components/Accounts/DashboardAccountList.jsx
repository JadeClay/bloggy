import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { Alert, Button, Container, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

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

function RegisterModal({refreshTable}) {
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false); // For enabling and disabling alert
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [changes, setChanges] = React.useState(0);

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

  const handleEmail = (e) => {
    setEmail(e.target.value);
}

  const handlePassword = (e) => {
      setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
      fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
           'username': username,
           'email': email,
           'password': password
          }),
      })
      .then(response => response.json())
      .then(response => {
          if(response.success === true){
              setChanges(changes + 1);
              refreshTable(changes); // Forces the Account List to re-render with the new row
              if(error) setError(false);
              setOpen(false);
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
      <Button variant={"contained"} onClick={handleOpen} startIcon={<AddIcon />}>Create user</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new user
          </Typography>
          <Container>
              <form method='POST' onSubmit={handleSubmit}>
                  <Stack sx={{mt: 2}} spacing={2}>
                      {error && <TextField error id="filled-basic1" label="Username" variant="filled" name='username' onChange={handleUsername} helperText={errorMessage} /> }
                      {error && <TextField error id="filled-basic2" label="Email" variant="filled" name='email' type='email' onChange={handleEmail} />}
                      {error && <TextField error id="filled-basic3" label="Password" variant="filled" name='password' type='password' onChange={handlePassword}/>}
                      {!error && <TextField id="filled-basic1" label="Username" variant="filled" name='username' onChange={handleUsername}/>}
                      {!error && <TextField id="filled-basic2" label="Email" variant="filled" name='email' type='email' onChange={handleEmail} />}
                      {!error && <TextField id="filled-basic3" label="Password" variant="filled" name='password' type='password' onChange={handlePassword}/>}
                      <Button type='submit'>Submit</Button>
                  </Stack>
              </form>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
}

export default function DashboardAccountList() {
    const [alert, setAlert] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [changed, setChanged] = React.useState([]);  

    const columns = [
      {
        field: 'email',
        headerName: 'Email Address',
        type: 'string',
        width: 750
      },
      { field: 'username', headerName: 'Username', width: 350 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
    
          return [
            <GridActionsCellItem
              icon={<DeleteOutline />}
              label="Delete"
              onClick={(e) => {
                fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/accounts/delete`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      'id': id
                    }),
                  }).then(response => response.json())
                    .then(response => {
                      if(response.success === true){
                        console.log(response.message);
                        startSuccess(true);
                        setChanged(!changed); // Changes this state to trigger the useEffect hook, so the accounts are re-rendered.
                        return true;
                      } else {
                        console.error(response.message);
                        startAlert(true);
                        return false;
                      }
                    });
              }}
              color="inherit"
            />,
          ];
        },
      } 
    ];

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/accounts/all`, {method: 'GET'})
        .then((response) => response.json())
        .then(res => res.Accounts)
        .then(res => setRows(res));
    }, [changed])

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
  
    return (
    <div style={{ height: 400, width: '90%' }}>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleAlert}>
        <Alert onClose={handleAlert} severity="success" sx={{ width: '100%' }}>
          The account was deleted succesfully!
        </Alert>
      </Snackbar>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlert}>
        <Alert onClose={handleAlert} severity="error" sx={{ width: '100%' }}>
          There has been an error deleting the account!
        </Alert>
      </Snackbar>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        editMode={"row"}
      />
      
      <Box sx={{width: {xs: 'auto', md: "19%"}, mt: "2vh"}}>
        <RegisterModal refreshTable={setChanged} />
      </Box>

    </div>
  );
}