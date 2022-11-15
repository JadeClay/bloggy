import { Grid, Typography } from '@mui/material'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import React from 'react'
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar';
import { useSelector } from 'react-redux';
import Editor from '../../Components/Posts/Editor';

export default function Dashboard() {
  const user = useSelector((state) => state.user.value);
  if(user.user != null || user.token != null){
    return (
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <AdminSidebar selectedElement={0}/>
        </Grid>
        

        <Grid item xs={11} sx={{marginLeft: {xs: '15vw', md: 0}}}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h3" textAlign={"left"} sx={{paddingTop: 3}}><EmojiPeopleIcon sx={{fontSize: 'inherit'}}/> Hello, {user.user}!</Typography>
            </Grid>
            <Grid item xs={12}>
              <Editor author={user.user}/>
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
