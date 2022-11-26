import { Button, InputAdornment, TextField } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useEffect } from 'react';

export default function EditBlogInfo() {
  const [defaultValue, setDefaultValue] = React.useState({name: "", description: "", instagram: "", twitter: ""});
  const [blogName, setBlogName] = React.useState("");
  const [blogDescription, setBlogDescription] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [twitter, setTwitter] = React.useState("");

  const handleBlogName = (e) => {
    setBlogName(e.target.value);
  };

  const handleBlogDescription = (e) => {
    setBlogDescription(e.target.value);
  };

  const handleInstagram = (e) => {
    setInstagram(e.target.value);
  };

  const handleTwitter = (e) => {
    setTwitter(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/info/edit`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': blogName,
                'description': blogDescription,
                'instagram': instagram,
                'twitter': twitter
            })
        })
  };

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/blog.json`, 
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then(res => {
        console.log(res);
        setDefaultValue(res);
    })
    },[])

  return (
    <Container sx={{width: '100%', pb: 2}}>
    <Stack sx={{width:'90%', mt: 1}}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={"100%"}
                mt={2}
            >
                <TextField 
                    id="blog-name" 
                    label="Blog Name" 
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    multiline
                    maxRows={1}
                    defaultValue={defaultValue.name}
                    sx={{width: '80%'}}
                    onChange={handleBlogName}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <DriveFileRenameOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            {console.log(defaultValue)}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={"100%"}
                mt={2}
            >
                <TextField 
                    id="blog-description" 
                    label="Blog Description" 
                    variant="outlined" 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={defaultValue.description}
                    sx={{width: '80%'}}
                    multiline
                    maxRows={1}
                    onChange={handleBlogDescription}
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
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={"100%"}
                mt={2}
            >
                <TextField 
                    id="blog-instagram" 
                    label="Instagram Profile link" 
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    multiline
                    maxRows={1}
                    sx={{width: '80%'}}
                    defaultValue={defaultValue.instagram}
                    onChange={handleInstagram}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <InstagramIcon />
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
                    id="blog-twitter" 
                    label="Twitter Profile link" 
                    variant="outlined" 
                    sx={{width: '80%'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    multiline
                    maxRows={1}
                    defaultValue={defaultValue.twitter}
                    onChange={handleTwitter}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <TwitterIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box
                width={"100%"}
                mt={2}
            >
              <Button variant="contained" component="label" startIcon={<EditIcon />} sx={{width: 'auto', ml: {xs: 4.3, md: 13} }} onClick={handleSubmit}>
                Update
              </Button>
            </Box>
        </Stack>
</Container>
  )
}
