import { Divider, Grid, Typography } from '@mui/material'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar';
import { useSelector } from 'react-redux';
import UploadCover from '../../Components/HeroImage/UploadCover';

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
              <Typography variant="h3" textAlign={"left"} sx={{paddingTop: 3}}><EmojiPeopleIcon sx={{fontSize: 'inherit', verticalAlign: '-4px'}}/> Hello, {user.user}!</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography variant="h5" color={'secondary'} textAlign={'center'}><ImageIcon sx={{fontSize: 'inherit', verticalAlign: '-3.8px'}}/> Blog cover photo</Typography>
                <Divider sx={{width: {xs: '90%', md: '100%'}}}/>

                <UploadCover />
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