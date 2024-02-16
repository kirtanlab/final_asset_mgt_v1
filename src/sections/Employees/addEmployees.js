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
// components

function AddEmployee() {
  const [done, setDone] = useState(false);

  const NewTypesSchema = Yup.object().shape({
    Employee_Name: Yup.string().max(50).required('Employee Name is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      Types_name: '',
      Types_desc: '',
      status: 'ACTIVE',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewTypesSchema),
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
      console.log('data', data);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Employee');
      console.log('error: ', error);
    }
  });
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={10}>
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
            <RHFTextField name="Types_name" label="Employee Name *" />
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
          {done && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              onSubmit Types has been added!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add Types
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddEmployee;
