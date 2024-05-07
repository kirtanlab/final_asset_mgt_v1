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
import { useGetAllEmployees } from 'src/queries/EmployeeQueries';
import { useGetAllLocations } from 'src/queries/LocationQueries';
import {
  useGetAllClassification,
  useUpdateClassification,
} from 'src/queries/ClassificationQueries';
import { getAllLocations } from 'src/apis/LocationApis';

function EditClassifications({ row }) {
  const updateClassificationMutation = useUpdateClassification();
  const NewClassSchema = Yup.object().shape({
    class_name: Yup.string().max(50).required('Category Name is required'),
    class_desc: Yup.string().max(250).required('Description is required'),
    status: Yup.string().required('Status is required'),
    location: Yup.string().required('Location is required'),
    locationOwner: Yup.string().required('Location owner is required'),
    owner: Yup.string().required('owner is required'),
  });

  const {
    data: LocationData,
    isSuccess: LocationisSuccess,
    error: LocationError,
    isLoading: LocationisLoading,
  } = useGetAllLocations();
  const { data: getAllClassificationData, error: getAllClassificationError } =
    useGetAllClassification();
  const { data: employeeData, error: getAllEmployeeError } = useGetAllEmployees();
  // console.log('employee data:' + employeeData, 'LocationsData: ' + LocationData);
  const defaultValues = useMemo(
    () => ({
      class_name: row?.category_name || '',
      class_desc: row?.category_desc || '',
      status: row?.status || 'ACTIVE',
      location: row?.location?.location_name || '',
      locationOwner: row?.owner?.employee_name || '',
      owner: row?.owner?.employee_name || '',
    }),
    [row]
  );
  const methods = useForm({
    resolver: yupResolver(NewClassSchema),
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

  console.log(getAllClassificationData);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const obj = {
        id: row.id,
        class_name: data.class_name,
        class_desc: data.class_desc,
        status: data.status === 'ACTIVE',
        location: LocationData.data.find((x) => x?.location_name === data.location).id,
        locationOwner: employeeData.data.find((x) => x?.employee_name === data.locationOwner).id,
        owner: employeeData.data.find((x) => x?.employee_name === data.locationOwner).id,
      };
      console.log('handle submit', data);
      await updateClassificationMutation.mutateAsync(obj);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of edit Classifications');
      console.log('error: ', error);
    }
  });
  const getClassification = useCallback(
    (rowData) => {
      try {
        setValue('class_name', rowData?.class_name, { shouldValidate: true });
        setValue('class_desc', rowData?.class_desc, { shouldValidate: true });
        setValue('status', rowData?.status === true ? 'ACTIVE' : 'INACTIVE', {
          shouldValidate: true,
        });
        setValue('location', rowData?.location?.location_name, {
          shouldValidate: true,
        });
        setValue('locationOwner', rowData?.owner?.employee_name, {
          shouldValidate: true,
        });
        setValue('owner', rowData?.owner?.employee_name, {
          shouldValidate: true,
        });
      } catch (err) {
        alert('Check your internet connectivity');
        console.log('error in handleSubmit of edit classification');
        console.log('error: ', err);
      }
    },
    [setValue]
  );

  useEffect(() => {
    getClassification(row);
  }, [getClassification, row]);
  if (LocationisLoading) {
    return <div>Loading...</div>;
  }
  if (LocationError || getAllClassificationError) {
    return <div>Error with location table </div>;
  }
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
            <RHFTextField name="class_name" label="Classification Name *" />
            <RHFTextField name="class_desc" label="classification Description *" />
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
            {LocationisSuccess && LocationData.length !== 0 && (
              <RHFAutocomplete
                name="location"
                label="Location *"
                options={LocationData.data.map((x) => x?.location_name)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const options = LocationData.data.map((x) => x?.location_name);
                  const label = options.filter((item) => item === option)[0];
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
            )}
            <RHFAutocomplete
              name="locationOwner"
              label="Location Owner*"
              options={employeeData.data.map((x) => x?.employee_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = employeeData.data.map((x) => x?.employee_name);
                const label = options.filter((item) => item === option)[0];
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
            <RHFAutocomplete
              name="owner"
              label="Owner*"
              options={employeeData.data.map((x) => x?.employee_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = employeeData.data.map((x) => x?.employee_name);
                const label = options.filter((item) => item === option)[0];
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
            {updateClassificationMutation.isSuccess && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Classification has been added!
              </Alert>
            )}
            {updateClassificationMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
              </Alert>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={updateClassificationMutation.isLoading}
              >
                Edit Classification
              </LoadingButton>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </FormProvider>
  );
}
EditClassifications.propTypes = {
  row: PropTypes.object,
};

export default EditClassifications;
