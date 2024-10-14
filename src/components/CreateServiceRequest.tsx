import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ServiceRequestForm {
  type: string;
  amount: number;
  duration: string;
  priority: 'low' | 'medium' | 'high';
  location: string;
}

const createServiceRequest = async (data: ServiceRequestForm): Promise<void> => {
  const response = await fetch('/api/service-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create service request');
  }
};

const CreateServiceRequest: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ServiceRequestForm>();

  const mutation = useMutation(createServiceRequest, {
    onSuccess: () => {
      navigate('/dashboard');
    },
  });

  const onSubmit = (data: ServiceRequestForm) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Service Request
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            rules={{ required: 'Service type is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="type"
                label="Service Type"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue={0}
            rules={{ required: 'Amount is required', min: { value: 0, message: 'Amount must be positive' } }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                type="number"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            defaultValue=""
            rules={{ required: 'Duration is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="duration"
                label="Duration"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            defaultValue="medium"
            rules={{ required: 'Priority is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                select
                id="priority"
                label="Priority"
                error={!!error}
                helperText={error?.message}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: 'Location is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create Service Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateServiceRequest;