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

function AddCategories() {
  const [done, setDone] = useState(false);

  const NewCategorySchema = Yup.object().shape({
    category_name: Yup.string().max(50).required('Category Name is required'),
    category_desc: Yup.string().max(250).required('Description is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      category_name: '',
      category_desc: '',
      status: 'ACTIVE',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewCategorySchema),
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
            <RHFTextField name="category_name" label="Category Name *" />
            <RHFTextField name="category_desc" label="Category Description *" />
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
              onSubmit Category has been added!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add Category
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddCategories;
