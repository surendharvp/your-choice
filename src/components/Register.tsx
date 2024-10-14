import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'SERVICE_PROVIDER';
}

const Register: React.FC = () => {
  const { control, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    // Implement registration logic here
    console.log('Register:', data);
  };

  return (
    <Container maxWidth="xs" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Username is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            defaultValue="USER"
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="USER" control={<Radio />} label="User" />
                <FormControlLabel value="SERVICE_PROVIDER" control={<Radio />} label="Service Provider" />
              </RadioGroup>
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
