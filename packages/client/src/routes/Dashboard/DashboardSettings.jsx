import { Divider, Grid, Typography } from '@mui/material'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ImageIcon from '@mui/icons-material/Image';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookIcon from '@mui/icons-material/Book';
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../Components/AdminSidebar';
import { useSelector } from 'react-redux';
import UploadCover from '../../Components/HeroImage/UploadCover';
import EditAutor from '../../Components/Author/EditAutor';
import EditBlogInfo from '../../Components/HeroImage/EditBlogInfo';

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
                <Typography variant="h5" color={'secondary'} textAlign={'center'}><ImageIcon sx={{fontSize: 'inherit', verticalAlign: '-3.8px'}}/> Hero Image</Typography>
                <Divider sx={{width: {xs: '90%', md: '100%'}}}/>

                <UploadCover />
            </Grid>
            <Grid item xs={12} md={9} sx={{mt: {xs: 2, md: 0} }}>
                <Typography variant="h5" color={'secondary'} textAlign={'center'}><AccountBoxIcon sx={{fontSize: 'inherit', verticalAlign: '-3.8px'}}/> Autor Information</Typography>
                <Divider sx={{width: '90%'}}/>

                <EditAutor/>
            </Grid>
            <Grid item xs={12} md={12} sx={{mt: {xs: 2, md: 0}}}>
                <Typography variant="h5" color={'secondary'} textAlign={'center'}><BookIcon sx={{fontSize: 'inherit', verticalAlign: '-3.8px'}}/> Blog Information</Typography>
                <Divider sx={{width: '92.5%'}}/>

                <EditBlogInfo />
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