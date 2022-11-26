import { PhotoCamera } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'

export default function UploadCover() {

    const handleFileChange = async (e) => {

        let formData = new FormData()
        formData.append('background', e.target.files[0])
        
        const response = await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/upload/background`, {
          method: 'POST',
          body: formData,
        })

        if(response) console.log(response)

    }
  
    return (
    <Grid container sx={{height: {xs: 'auto', md:'40vh'}, mt: 0.5}} spacing={1}>
        <Grid item xs={12}>
            <Box sx={{ width: {xs: '90%', md: '100%'}, height: '100%', p: {xs: 16.8, md: 5.7}, backgroundImage: `url(http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/images/background.jpg)`, backgroundSize: 'cover'}}></Box>
        </Grid>
        <Grid item xs={12}>
            <Stack direction={'row'}>
                <form method='POST' encType="multipart/form-data">
                    <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                        Upload
                        <input hidden accept=".jpg" type="file" name="background.jpg" onChange={handleFileChange}/>
                    </Button>
                </form>
                
                <Typography variant='body2' sx={{p: 1}}>* Accepts just .jpeg images</Typography>
                
            </Stack>
        </Grid>
    </Grid>
  )
}
