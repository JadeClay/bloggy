import { Grid } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import { useSelector } from 'react-redux';
import Editor from '../Components/Posts/Editor';

export default function Dashboard() {
  const user = useSelector((state) => state.user.value);
  if(user.user != null || user.token != null){
    return (
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <AdminSidebar />
        </Grid>
        

        <Grid item xs={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p>Hola, Oscar Alberto!</p>
            </Grid>
            <Grid item xs={12}>
              <Editor />
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
