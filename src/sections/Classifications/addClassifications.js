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
import {
  useCreateClassification,
  useGetAllClassification,
} from 'src/queries/ClassificationQueries';
import { useGetAllEmployees } from 'src/queries/EmployeeQueries';
import { getAllLocations } from 'src/apis/LocationApis';
import { useClassificationContext } from 'src/context/ClassificationContext';
import { Class } from '@mui/icons-material';
import { get } from 'lodash';
import { useGetAllLocations } from 'src/queries/LocationQueries';

function AddClassifications() {
  const [done, setDone] = useState(false);
  const { setAddedFlag } = useClassificationContext();
  const createClassificationMutation = useCreateClassification();
  const NewClassificationSchema = Yup.object().shape({
    class_desc: Yup.string().max(250).required('Description is required'),
    class_name: Yup.string().max(50).required('Classification Name is required'),
    status: Yup.string().required('Status is required'),
    location: Yup.string().required('location is required'),
    locationOwner: Yup.string().required('location owner is required'),
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
  const { data: getAllEmployeeData, error: getAllEmployeeError } = useGetAllEmployees();
  const defaultValues = useMemo(
    () => ({
      class_desc: '',
      class_name: '',
      status: 'ACTIVE',
      location: '',
      locationOwner: '',
      owner: '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewClassificationSchema),
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

  console.log(getAllEmployeeData);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const obj = {
        class_desc: data.class_desc,
        class_name: data.class_name,
        status: data.status === 'ACTIVE',
        location: LocationData.data.find((x) => x?.location_name === data.location).id,
        locationOwner: getAllEmployeeData.data.find((x) => x?.employee_name === data.locationOwner)
          .id,
        owner: getAllEmployeeData.data.find((x) => x?.employee_name === data.owner).id,
      };
      console.log(obj);
      await createClassificationMutation.mutateAsync(obj);
      setAddedFlag(true);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add classification');
      console.log('error: ', error);
    }
  });

  if (LocationisLoading) {
    return <div>Loading...</div>;
  }
  if (LocationError || getAllClassificationError) {
    return <div>Error with location table </div>;
  }
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12}>
        <Card sx={{ p: 3 }}>
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
            <RHFTextField name="class_desc" label="Classification Description *" />
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
            <RHFAutocomplete
              name="locationOwner"
              label="Location Owner*"
              options={getAllEmployeeData.data.map((x) => x?.employee_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = getAllEmployeeData.data.map((x) => x?.employee_name);
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
              options={getAllEmployeeData.data.map((x) => x?.employee_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = getAllEmployeeData.data.map((x) => x?.employee_name);
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

          {createClassificationMutation.isSuccess && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Classification has been added!
            </Alert>
          )}
          {createClassificationMutation.isError && (
            <Alert severity="error" sx={{}}>
              <AlertTitle>Error</AlertTitle>
              Something went wrong!
            </Alert>
          )}
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={createClassificationMutation.isSuccess}
              type="submit"
              variant="contained"
              loading={createClassificationMutation.isLoading}
            >
              Add Classification
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddClassifications;
