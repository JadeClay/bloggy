import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useEffect } from 'react';

export default function EditAutor() {
    const [author, setAuthor] = React.useState("");
    const [description, setDescription] = React.useState("");

    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const handleAutorDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/author/edit`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'author': author,
                'description': description
            })
        })
    }

    const handleFileChange = async (e) => {

        let formData = new FormData()
        formData.append('profile', e.target.files[0])
        
        const response = await fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/upload/author`, {
          method: 'POST',
          body: formData,
        })

        if(response) console.log(response)

    }

  return (
        <Container sx={{width: '100%'}}>
            <Stack sx={{width:'90%', mt: 1}}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width={"100%"}
                        mt={2}
                    >
                        <TextField 
                            id="author-name" 
                            label="Author Name" 
                            variant="outlined"
                            sx={{width: '80%'}}
                            onChange={handleAuthor}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <ContactPageIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width={"100%"}
                        mt={2}
                    >
                        <TextField 
                            id="author-description" 
                            label="Author Description (Use markdown for style)" 
                            variant="outlined" 
                            sx={{width: '80%'}}
                            multiline
                            maxRows={4}
                            onChange={handleAutorDescription}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box
                        width={"100%"}
                        mt={2}
                    >
                        <Stack direction={"row"}>
                            
                            <form method='POST' encType="multipart/form-data">
                                <Button component="label" sx={{ml: {xs: 6.4, md: 11}}}>
                                    <PhotoCameraIcon />
                                    <input hidden accept=".jpg" type="file" name="background.jpg" onChange={handleFileChange}/>
                                </Button>
                            </form>
                            
                            <Button variant="contained" component="label" startIcon={<EditIcon />} sx={{width: 'auto', ml: 2 }} onClick={handleSubmit}>
                                Update
                            </Button>
                        </Stack>
                    </Box>
                    
                </Stack>
        </Container>
    
  )
}
