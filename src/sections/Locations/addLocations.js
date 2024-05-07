import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useCreateLocation, useGetAllLocations } from 'src/queries/LocationQueries';
import { useLocationContext } from 'src/context/LocationContext';
// components

function AddLocations() {
  const [done, setDone] = useState(false);
  const { setAddedFlag } = useLocationContext();
  const createLocationMutation = useCreateLocation();
  const getAllLocations = useGetAllLocations();
  const NewLocationSchema = Yup.object().shape({
    company_name: Yup.string().max(50).required('Company Name is required'),
    department_name: Yup.string().max(250).required('department is required'),
    location_name: Yup.string().max(250).required('location is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      company_name: '',
      department_name: '',
      location_name: '',
      status: 'ACTIVE',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewLocationSchema),
    defaultValues,
  });
  const popover = usePopover();
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      const obj = {
        company_name: data.company_name,
        department_name: data.department_name,
        location_name: data.location_name,
        status: data.status === 'ACTIVE',
      };
      console.log(obj);
      await createLocationMutation.mutateAsync(obj);
      setAddedFlag(true);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Location');
      console.log('error: ', error);
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={10}>
        <Card sx={{ p: 3, height: 340, position: 'relative' }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="company_name" label="Company Name *" />
            <RHFTextField name="department_name" label="Department Name *" />
            <RHFTextField name="location_name" label="Location Name *" />
            <RHFAutocomplete
              name="status"
              label="Current Status *"
              options={['ACTIVE', 'INACTIVE']}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const label = ['ACTIVE', 'INACTIVE'].filter((t) => t === option)[0];
                if (!label) {
                  return null;
                }
                return (
                  <li {...props} key={label}>
                    {label}
                  </li>
                );
              }}
            />
          </Box>

          {/* New Box wrapper for success and error messages, and LoadingButton */}
          <Box position="absolute" bottom={0} left={0} right={0} p={3}>
            {createLocationMutation.isSuccess && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Location has been added!
              </Alert>
            )}
            {createLocationMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
              </Alert>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={createLocationMutation.isLoading}
              >
                Add Location
              </LoadingButton>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddLocations;
