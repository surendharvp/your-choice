import React from 'react';
import { useQuery } from 'react-query';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface ServiceRequest {
  id: number;
  type: string;
  amount: number;
  duration: string;
  priority: string;
  location: string;
}

const fetchServiceRequests = async (): Promise<ServiceRequest[]> => {
  const response = await fetch('/api/service-requests/open');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Dashboard: React.FC = () => {
  const { data: serviceRequests, isLoading, error } = useQuery<ServiceRequest[], Error>(
    'serviceRequests',
    fetchServiceRequests
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>An error has occurred: {error.message}</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button component={Link} to="/create-service-request" variant="contained" color="primary" sx={{ mb: 2 }}>
          Create New Service Request
        </Button>
        <List>
          {serviceRequests?.map((request) => (
            <ListItem key={request.id}>
              <ListItemText
                primary={request.type}
                secondary={`Amount: $${request.amount} | Duration: ${request.duration} | Priority: ${request.priority} | Location: ${request.location}`}
              />
              <Button variant="outlined" color="primary">
                View Details
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;