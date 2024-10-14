import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Service Bidding Platform
        </Typography>
        <Button component={Link} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>
          Login
        </Button>
        <Button component={Link} to="/register" variant="outlined" color="primary">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Home;