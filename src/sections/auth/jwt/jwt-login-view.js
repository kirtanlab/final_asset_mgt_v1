import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useLoginEmployee } from 'src/queries/EmployeeQueries';
import { setSession } from 'src/auth/context/jwt/utils';
import { useAuth } from 'src/auth/context/jwt/auth-provider';
import { useThrottle } from 'yet-another-react-lightbox';
import { useSnackbar } from 'src/components/snackbar';
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const password = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '110',
    password: 'pass123456',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;
  const { mutateAsync: LoginMutation, isLoading, isError, error: ResError } = useLoginEmployee();
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Asset Management</Typography>
    </Stack>
  );
  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Please check your internet connection!', {
        variant: 'error',
        color: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  }, [enqueueSnackbar, isError]);

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label="Employee Code" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
        loading={isLoading}
      >
        Login
      </LoadingButton>
      {/* {isError ? (

        // <Alert severity="error">
        //   {ResError?.response?.status === 401
        //     ? 'Invalid Credentials'
        //     : 'Please Check Your Internet Connection'}
        // </Alert>
      ): null} */}
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(LoginMutation)}>
      {renderHead}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use Employee Code : <strong>10231</strong> / password :
        <strong> GeneratedPassword123</strong>
      </Alert> */}

      {renderForm}
    </FormProvider>
  );
}
