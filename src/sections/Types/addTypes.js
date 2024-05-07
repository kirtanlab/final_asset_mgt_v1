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
import { useGetAllClassification } from 'src/queries/ClassificationQueries';
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import { useCreateType } from 'src/queries/TypesQueries';
// components

function AddTypes() {
  const [done, setDone] = useState(false);
  const {
    isSuccess: getAllClassificationIsSuccess,
    data: getAllClassificationData,
    error: getAllClassificationError,
    isLoading: isLoadingClassification,
  } = useGetAllClassification();
  const {
    isLoading: getAllCategoriesIsLoading,
    data: getAllCategoriesData,
    error: getAllCategoriesError,
  } = useGetAllCategories();
  const createTypeMutation = useCreateType();
  const NewTypesSchema = Yup.object().shape({
    type_name: Yup.string().max(50).required('Types Name is required'),
    type_desc: Yup.string().max(250).required('Description is required'),
    category_id: Yup.string().max(250).required('category is required'),
    class_id: Yup.string().max(250).required('classification is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      type_name: '',
      type_desc: '',
      status: 'ACTIVE',
      class_id: '',
      category_id: '',
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
      const obj = {
        type_name: data.type_name,
        type_desc: data.type_desc,
        status: data.status === 'ACTIVE',
        class_id: getAllClassificationData.data.find((x) => x?.class_name === data.class_id).id,
        category_id: getAllCategoriesData.data.find((x) => x?.category_name === data.category_id)
          .id,
      };
      console.log('data', obj);
      await createTypeMutation.mutateAsync(obj);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Add Categories');
      console.log('error: ', error);
    }
  });
  if (isLoadingClassification || getAllCategoriesIsLoading) {
    return <div>Loading...</div>;
  }
  if (getAllClassificationError || getAllCategoriesError) {
    return <div>Error with fetching data table </div>;
  }
  console.log('categories Data: ', getAllClassificationData, getAllCategoriesData);
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
            <RHFTextField name="type_name" label="Types Name *" />
            <RHFTextField name="type_desc" label="Types Description *" />
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
              name="category_id"
              label="Category *"
              options={getAllCategoriesData.data.map((x) => x?.category_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = getAllCategoriesData.data.map((x) => x?.category_name);
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
              name="class_id"
              label="Classifications *"
              options={getAllClassificationData.data.map((x) => x?.class_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = getAllClassificationData.data.map((x) => x?.class_name);
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

          {/* {done && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              onSubmit Types has been added!
            </Alert>
          )} */}
          {createTypeMutation.isSuccess && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Type has been added!
            </Alert>
          )}
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={createTypeMutation.isSuccess}
              type="submit"
              variant="contained"
              loading={createTypeMutation.isLoading}
            >
              Add Types
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

export default AddTypes;
