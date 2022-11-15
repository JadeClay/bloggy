import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Alert, Snackbar } from '@mui/material';

function handleEditClick (id) {

}



/* TO DO:

- Design own table component

*/

export default function DashboardPostList() {
    const [alert, setAlert] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [changed, setChanged] = React.useState([]);  

    const columns = [
      {
        field: 'date',
        headerName: 'date',
        type: 'dateTime',
        width: 150,
        valueGetter: ({ value }) => value && new Date(value).toDateString()
      },
      { field: 'title', headerName: 'Post Title', width: 200, sortable: false, editable: true },
      { field: 'body', headerName: 'Content', width: 630, sortable: false },
      { field: 'author', headerName: 'author', width: 120 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
    
          return [
            <GridActionsCellItem
              icon={<EditOutlined />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteOutline />}
              label="Delete"
              onClick={(e) => {
                console.log(e.target.id);
                fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/delete`, {
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
                        setChanged(!changed); // Changes this state to trigger the useEffect hook, so the posts are re-rendered.
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
        fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/all`, {method: 'GET'})
        .then((response) => response.json())
        .then(res => setRows(res.Posts));
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
          The post was deleted succesfully!
        </Alert>
      </Snackbar>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlert}>
        <Alert onClose={handleAlert} severity="error" sx={{ width: '100%' }}>
          There has been an error deleting the post!
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

      {console.log(rows)}
    </div>
  );
}