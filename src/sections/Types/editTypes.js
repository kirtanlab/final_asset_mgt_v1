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
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import { useGetAllClassification } from 'src/queries/ClassificationQueries';
import { useUpdateType } from 'src/queries/TypesQueries';
// components

function EditTypes({ row }) {
  const [done, setDone] = useState(false);
  console.log('console.log: row', row);
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
  const updateTypeMutation = useUpdateType();
  const NewTypesSchema = Yup.object().shape({
    type_name: Yup.string().max(50).required('Types Name is required'),
    type_desc: Yup.string().max(250).required('Description is required'),
    category_id: Yup.string().max(250).required('category is required'),
    class_id: Yup.string().max(250).required('classification is required'),
    status: Yup.string().required('Status is required'),
  });
  const defaultValues = useMemo(
    () => ({
      type_name: row?.type_name || '',
      type_desc: row?.type_desc || '',
      status: row?.status || 'ACTIVE',
      class_id: row?.class_id?.class_name,
      category_id: row?.category_id?.category_name,
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
      const obj = {
        id: row.id,
        type_name: data.type_name,
        type_desc: data.type_desc,
        status: data.status === 'ACTIVE',
        class_id: {
          id: getAllClassificationData.data.find((x) => x?.class_name === data.class_id).id,
        },
        category_id: {
          id: getAllCategoriesData.data.find((x) => x?.category_name === data.category_id).id,
        },
      };
      console.log('data', obj);
      await updateTypeMutation.mutateAsync(obj);
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Edit Type');
      console.log('error: ', error);
    }
  });
  // const getTypes = useCallback(
  //   (rowData) => {
  //     try {
  //       setValue('Types_name', rowData?.types, { shouldValidate: true });
  //       setValue('Types_desc', rowData?.category_desc, { shouldValidate: true });
  //       setValue('status', rowData?.status, { shouldValidate: true });
  //     } catch (err) {
  //       alert('Check your internet connectivity');
  //       console.log('error in handleSubmit of Add Categories');
  //       console.log('error: ', err);
  //     }
  //   },
  //   [setValue]
  // );

  // useEffect(() => {
  //   getTypes(row);
  // }, [getTypes, row]);
  if (isLoadingClassification || getAllCategoriesIsLoading) {
    return <div>Loading...</div>;
  }
  if (getAllClassificationError || getAllCategoriesError) {
    return <div>Error with fetching data table </div>;
  }
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
          {updateTypeMutation.isSuccess && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Types has been Edited!
            </Alert>
          )}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={updateTypeMutation.isSuccess}
              type="submit"
              variant="contained"
              loading={updateTypeMutation.isLoading}
            >
              Edit Types
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
EditTypes.propTypes = {
  row: PropTypes.object,
};

export default EditTypes;
