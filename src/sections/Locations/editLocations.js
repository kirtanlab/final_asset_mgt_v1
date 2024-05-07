import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useUpdateLocation } from 'src/queries/LocationQueries';
// components

function EditLocations({ row }) {
  const [done, setDone] = useState(false);
  const updateLocationMutation = useUpdateLocation();
  const NewLocationSchema = Yup.object().shape({
    company_name: Yup.string().max(50).required('Comapny Name is required'),
    department_name: Yup.string().max(250).required('Department is required'),
    location_name: Yup.string().max(250).required('Location is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      company_name: row?.company_name || '',
      department_name: row?.department_name || '',
      location_name: row?.location_name || '',
      status: row?.status || 'ACTIVE',
    }),
    [row]
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
        id: row.id,
        company_name: data.company_name,
        department_name: data.department_name,
        location_name: data.location_name,
        status: data.status === 'ACTIVE',
      };
      console.log(obj);
      await updateLocationMutation.mutateAsync(obj);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Categories');
      console.log('error: ', error);
    }
  });
  const getLocation = useCallback(
    (rowData) => {
      try {
        setValue('company_name', rowData?.company_name, { shouldValidate: true });
        setValue('department_name', rowData?.department_name, { shouldValidate: true });
        setValue('location_name', rowData?.location_name, { shouldValidate: true });
        setValue('status', rowData?.status === true ? 'ACTIVE' : 'INACTIVE', {
          shouldValidate: true,
        });
      } catch (err) {
        alert('Check your internet connectivity');
        console.log('error in handleSubmit of Add Categories');
        console.log('error: ', err);
      }
    },
    [setValue]
  );

  useEffect(() => {
    getLocation(row);
  }, [getLocation, row]);
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
            <RHFTextField name="department_name" label="Department Description *" />
            <RHFTextField name="location_name" label="Location Description *" />
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
            {updateLocationMutation.isSuccess && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Location has been added!
              </Alert>
            )}
            {updateLocationMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
              </Alert>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={updateLocationMutation.isLoading}
                disabled={updateLocationMutation.isSuccess}
              >
                Edit Category
              </LoadingButton>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </FormProvider>
  );
}
EditLocations.propTypes = {
  row: PropTypes.object,
};

export default EditLocations;
