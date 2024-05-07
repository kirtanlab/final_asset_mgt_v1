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
import { useCreateEmployee } from 'src/queries/EmployeeQueries';
import { useEmployeeContext } from 'src/context/EmployeeContext';
// components

function AddEmployee() {
  const [done, setDone] = useState(false);
  const createEmployeeMutation = useCreateEmployee();
  const { setAddedFlag } = useEmployeeContext();
  const NewEmployeeSchema = Yup.object().shape({
    employee_name: Yup.string().max(50).required('Employee Name is required'),
    employeeCode: Yup.string().max(50).required('Employee Code is required'),
    employee_dept: Yup.string().max(50).required('Employee Department is required'),
    employee_pass: Yup.string().max(50).required('Employee Password is required'),
    role: Yup.string().max(50).required('Employee Rolw is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      employee_name: '',
      employeeCode: '',
      employee_dept: '',
      employee_pass: '',
      role: '',
      status: 'ACTIVE',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewEmployeeSchema),
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
        employee_name: data.employee_name,
        employeeCode: data.employeeCode,
        employee_dept: data.employee_dept,
        employee_pass: data.employee_pass,
        role: data.role,
        status: data.status === 'ACTIVE',
      };
      await createEmployeeMutation.mutateAsync(obj);
      setAddedFlag(true);
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
            <RHFTextField name="employee_name" label="Employee Name *" />
            <RHFTextField name="employeeCode" label="Employee Code *" />
            <RHFTextField name="employee_dept" label="Employee Department *" />
            <RHFTextField name="employee_pass" label="Employee Password *" />
            <RHFTextField name="role" label="Employee Role *" />
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
              Add Employee
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddEmployee;
