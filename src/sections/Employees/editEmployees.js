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
import { useUpdateEmployee } from 'src/queries/EmployeeQueries';

// components

function EditEmployees({ row }) {
  const [done, setDone] = useState(false);
  const updateEmployeeMutation = useUpdateEmployee();
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
      employee_name: row?.employee_name || '',
      employeeCode: row?.employeeCode || '',
      employee_dept: row?.employee_dept || '',
      employee_pass: row?.employee_pass || '',
      role: row?.role || '',
      status: row?.status || 'ACTIVE',
    }),
    [row]
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
        id: row.id,
        employee_name: data.employee_name,
        employeeCode: data.employeeCode,
        employee_dept: data.employee_dept,
        employee_pass: data.employee_pass,
        role: data.role,
        status: data.status === 'ACTIVE',
      };
      console.log(obj)
      await updateEmployeeMutation.mutateAsync(obj);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Categories');
      console.log('error: ', error);
    }
  });
  const getTypes = useCallback(
    (rowData) => {
      try {
        setValue('employee_name', rowData?.employee_name, { shouldValidate: true });
        setValue('employeeCode', rowData?.employeeCode, { shouldValidate: true });
        setValue('employee_dept', rowData?.employee_dept, { shouldValidate: true });
        setValue('employee_pass', rowData?.employee_pass, { shouldValidate: true });
        setValue('role', rowData?.role, { shouldValidate: true });
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

          <Box position="absolute" bottom={0} left={0} right={0} p={3}>
            {updateEmployeeMutation.isSuccess && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Employee has been added!
              </Alert>
            )}
            {updateEmployeeMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                Something went wrong!
              </Alert>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={updateEmployeeMutation.isLoading}
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
EditEmployees.propTypes = {
  row: PropTypes.object,
};

export default EditEmployees;
