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
// components

function EditEmployees({ row }) {
  const [done, setDone] = useState(false);

  const NewTypesSchema = Yup.object().shape({
    Employee_Name: Yup.string().max(50).required('Employee Name is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      Employee_Name: row?.employee_name || '',
      status: row?.status || 'ACTIVE',
    }),
    [row]
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
      console.log('error in handleSubmit of Add Categories');
      console.log('error: ', error);
    }
  });
  const getTypes = useCallback(
    (rowData) => {
      try {
        setValue('Employee_Name', rowData?.employee_name, { shouldValidate: true });
        setValue('status', rowData?.status, { shouldValidate: true });
      } catch (err) {
        alert('Check your internet connectivity');
        console.log('error in handleSubmit of Add Categories');
        console.log('error: ', err);
      }
    },
    [setValue]
  );

  useEffect(() => {
    getTypes(row);
  }, [getTypes, row]);
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
            <RHFTextField name="Employee_Name" label="Employee Name *" />
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
              Employee has been added!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Edit Employee
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
EditEmployees.propTypes = {
  row: PropTypes.object,
};

export default EditEmployees;
