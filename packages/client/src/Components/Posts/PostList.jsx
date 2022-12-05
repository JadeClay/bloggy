import { Divider, Pagination, Paper, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PostList() {
    const [posts, setPosts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const postsPerPage = 5;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const count = Math.ceil(posts.length / postsPerPage);

    const handlePagination = (event, value) => {
      setCurrentPage(value);
    }

    useEffect(() => {
      fetch(`http://${process.env.REACT_APP_API_HOSTNAME}:${process.env.REACT_APP_API_PORT}/posts/all`, { method: 'GET' })
        .then((response) => response.json())
        .then(res => setPosts([...res.Posts]));
    },[]);

  return (
    <Container>
        <Stack sx={{mt: 1, minHeight: '58vh'}}>
          {
            currentPosts.map((post, index) => (
              <Paper key={index} sx={{m: 1}} elevation={4}>
                <Container>
                  <Typography variant="h4" component="h2" sx={{mt: 1.5}}>{post.title}</Typography>
                  <Typography variant="subtitle2" >Written by <b>{post.author}</b></Typography>
                  <Divider />
                  <Typography variant='body'><ReactMarkdown children={post.body}/></Typography>
                </Container>
              </Paper>
            ))
          }

          <Pagination count={count} color="primary" onChange={handlePagination} sx={{m: "auto", mt: 1}}/>
        </Stack>
    </Container>
  )
}
