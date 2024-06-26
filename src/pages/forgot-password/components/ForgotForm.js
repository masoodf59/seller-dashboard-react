import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function ForgotForm() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({ email: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleChange = (e) => {
    const { target } = e;
    setFormInputs({ ...formInputs, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', inputs.email.trim());
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={formInputs.email}
          onChange={handleChange}
          name='email'
          required
          fullWidth
          autoComplete='username'
          type='email'
          label='Email address'
          sx={{ mb: 3 }}
        />
      </Stack>
      <Stack justifyContent='center' alignItems='center'>
        <div style={{ width: 'fit-content' }}>
          <LoadingButton size='large' type='submit' variant='contained' loading={isLoading}>
            Reset
          </LoadingButton>
        </div>
      </Stack>
    </form>
  );
}
