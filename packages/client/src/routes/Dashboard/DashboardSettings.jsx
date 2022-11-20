import { Grid, Typography } from '@mui/material'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import React from 'react'
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar';
import { useSelector } from 'react-redux';

export default function DashboardSettings() {
  const user = useSelector((state) => state.user.value);
  if(user.user != null || user.token != null){
    return (
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <AdminSidebar selectedElement={3}/>
        </Grid>
        

        <Grid item xs={11} sx={{marginLeft: {xs: '15vw', md: 0}}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h3" textAlign={"left"} sx={{paddingTop: 3}}><EmojiPeopleIcon sx={{fontSize: 'inherit'}}/> Hello, {user.user}!</Typography>
            </Grid>
            <Grid item xs={12}>
                <p>Testing</p>
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