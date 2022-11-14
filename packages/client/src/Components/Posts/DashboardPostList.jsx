import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';

const columns = [
  { field: 'title', headerName: 'Post Title', width: 190, sortable: false },
  { field: 'body', headerName: 'Content', width: 630, sortable: false },
  { field: 'author', headerName: 'author', width: 120 },
  {
    field: 'date',
    headerName: 'date',
    type: 'dateTime',
    width: 98,
    valueGetter: ({ value }) => value && new Date(value),
  },
];

/* TO DO:

- Add server side pagination
- Add delete and edit buttons or options

*/

export default function DashboardPostList() {
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/all`, {method: 'GET'})
        .then((response) => response.json())
        .then(res => setRows(res.Posts));
    })
  
    return (
    <div style={{ height: 400, width: '90%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
        checkboxSelection
      />

      {console.log(rows)}
    </div>
  );
}