import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { usePopover } from 'src/components/custom-popover';
import FormProvider from 'src/components/hook-form/form-provider';
import { Alert, AlertTitle, Box, Card, Grid, Stack } from '@mui/material';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import { useGetAllClassification } from 'src/queries/ClassificationQueries';
import { useGetAllTypes, useUpdateType } from 'src/queries/TypesQueries';
import { useGetAllEmployees } from 'src/queries/EmployeeQueries';
import { useGetAllLocations } from 'src/queries/LocationQueries';
import { useCreateAssetRequests, useUpdateAssetRequests } from 'src/queries/AssetRequestQueries';
import { useAuth } from 'src/auth/context/jwt/auth-provider';
import { DatePicker } from '@mui/x-date-pickers';
import { isError } from 'lodash';
import { fDate, fDateTime } from 'src/utils/format-time';
import { formatDate } from '@fullcalendar/core';
import dayjs from 'dayjs';

function EditAssetRequest({ row, type = 'edit' }) {
  const { user } = useAuth();
  const employee_id = user.id;
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
  const {
    data: getAllTypeData,
    error: getAllTypeError,
    isLoading: getAllTypeLoading,
    isSuccess: getAllTypeSuccess,
  } = useGetAllTypes();
  const {
    data: AllEmployeeData,
    error: AllEmployeeError,
    isLoading: AllEmployeeLoading,
    isSuccess: AllEmployeeSuccess,
  } = useGetAllEmployees();
  const {
    data: AllLocationsData,
    error: AllCategoryError,
    isLoading: AllCategoryLoading,
  } = useGetAllLocations();
  const updateAssetRequestMutation = useUpdateAssetRequests();
  const createAssetRequestMutation = useCreateAssetRequests();
  const updateRequestSchema = Yup.object().shape({
    allocated_asset_id: Yup.string().max(50).required('Allocated asset id is required!'),
    details: Yup.string().max(250).required('Description is required!'),
    reason: Yup.string().max(250),
    req_by: Yup.string().max(250).required('Required by is required'),
    type_id: Yup.string().max(250).required('Asset Type is required'),
    cat_id: Yup.string().max(250).required('Asset Category is required'),
    class_id: Yup.string().max(250).required('Asset Classification is required'),
    loc_id: Yup.string().max(250).required('Location is required'),
    reporting_to_id: Yup.string().max(250).required('Reporting to is required'),
  });
  console.log('row: ', row);
  const FormattedReqBy = dayjs(row?.required_by).format('MM-DD-YYYY');
  const defaultValues = useMemo(
    () => ({
      allocated_asset_id: row?.allocated_asset_id || '',
      details: row?.details || '',
      reason: row?.reason || '',
      req_by: new Date(row?.required_by) || '',
      type_id: row?.asset_type_id?.type_name || '',
      loc_id: row?.location_id?.location_name || '',
      class_id: row?.classification_id?.class_name || '',
      cat_id: row?.category_id?.category_name || '',
      reporting_to_id: row?.reporting_to_id?.employee_name || '',
    }),
    [row]
  );
  const today = dayjs();
  console.log('dirty: ', FormattedReqBy, dayjs(), today, dayjs(row?.required_by));
  const methods = useForm({
    resolver: yupResolver(updateRequestSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isDirty, dirtyFields, errors },
  } = methods;
  const reqDate = watch('req_by');
  console.log('updateAssetRequestMutation: ', updateAssetRequestMutation.status);
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('obj');
      let obj = {};
      // const FormattedReqBy = dayjs(data?.req_by).format('YYYY-MM-DD');
      if (type === 'edit') {
        obj = {
          id: row.id,
          reason: data?.reason,
          details: data.details,
          required_by: FormattedReqBy,
          allocated_asset_id: data.allocated_asset_id,
          status: { id: 4 },
          classification_id: {
            id: getAllClassificationData.data.find((x) => x?.class_name === data.class_id).id,
          },
          location_id: {
            id: AllLocationsData.data.find((x) => x?.location_name === data.loc_id).id,
          },
          category_id: {
            id: getAllCategoriesData.data.find((x) => x?.category_name === data.cat_id).id,
          },
          asset_type_id: {
            id: getAllTypeData.data.find((x) => x?.type_name === data.type_id).id,
          },
          reporting_to_id: {
            id: AllEmployeeData.data.find((x) => x?.employee_name === data?.reporting_to_id).id,
          },
          employee: {
            id: user.id,
          },
          isAdhoc: true,
        };
      } else if (type === 'add') {
        obj = {
          reason: data?.reason,
          details: data.details,
          required_by: FormattedReqBy,
          allocated_asset_id: data.allocated_asset_id,
          status: 4,
          classification_id: getAllClassificationData.data.find(
            (x) => x?.class_name === data.class_id
          ).id,
          location_id: AllLocationsData.data.find((x) => x?.location_name === data.loc_id).id,
          category_id: getAllCategoriesData.data.find((x) => x?.category_name === data.cat_id).id,
          asset_type_id: getAllTypeData.data.find((x) => x?.type_name === data.type_id).id,
          reporting_to_id: AllEmployeeData.data.find(
            (x) => x?.employee_name === data?.reporting_to_id
          ).id,
          employee: user.id,
          isAdhoc: true,
        };
      }

      console.log('data', obj);
      if (type === 'edit') {
        await updateAssetRequestMutation.mutateAsync(obj);
      } else {
        await createAssetRequestMutation.mutateAsync(obj);
      }
    } catch (error) {
      alert('Check your internet connectivity');
      console.log('error in handleSubmit of Edit Type');
      console.log('error: ', error);
    }
  });
  if (
    isLoadingClassification ||
    getAllCategoriesIsLoading ||
    getAllTypeLoading ||
    AllEmployeeLoading ||
    AllCategoryLoading
  ) {
    return <div>Loading...</div>;
  }
  if (
    getAllClassificationError ||
    getAllCategoriesError ||
    AllCategoryError ||
    AllEmployeeError ||
    getAllTypeError
  ) {
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
            <RHFTextField
              disabled={type === 'view' ? true : undefined}
              name="allocated_asset_id"
              label="Allocated asset id *"
            />
            <RHFTextField
              disabled={type === 'view' ? true : undefined}
              name="details"
              label="Asset Request Description *"
            />
            <RHFTextField
              disabled={type === 'view' ? true : undefined}
              name="reason"
              label="Asset Request reason"
            />
            <Controller
              name="req_by"
              control={control}
              render={({ field, fieldState: { error } }) => {
                console.log('field: ', field);
                return (
                  <DatePicker
                    disabled={type === 'view' ? true : undefined}
                    label='Required by'
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    defaultValue={new Date(row?.required_by)}
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                );
              }}
            />
            <RHFAutocomplete
              name="type_id"
              label="Asset Type *"
              disabled={type === 'view' ? true : undefined}
              options={getAllTypeData.data.map((x) => x?.type_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = getAllTypeData.data.map((x) => x?.type_name);
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
              name="cat_id"
              label="Category *"
              disabled={type === 'view' ? true : undefined}
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
              disabled={type === 'view' ? true : undefined}
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
            <RHFAutocomplete
              name="loc_id"
              label="Location *"
              disabled={type === 'view' ? true : undefined}
              options={AllLocationsData.data.map((x) => x?.location_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = AllLocationsData.data.map((x) => x?.location_name);
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
              name="reporting_to_id"
              label="Reporting To *"
              disabled={type === 'view' ? true : undefined}
              options={AllEmployeeData.data.map((x) => x?.employee_name)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const options = AllEmployeeData.data.map((x) => x?.employee_name);
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
          {updateAssetRequestMutation.isSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              <AlertTitle>Success</AlertTitle>
              Asset Request has been Edited!
            </Alert>
          )}
          {createAssetRequestMutation.isSuccess && (
            <Alert severity="success" sx={{ mt: 3 }}>
              <AlertTitle>Success</AlertTitle>
              Asset Request has been Edited!
            </Alert>
          )}

          {type !== 'view' && (
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                disabled={
                  updateAssetRequestMutation.isSuccess || createAssetRequestMutation.isSuccess
                }
                type="submit"
                variant="contained"
                loading={
                  updateAssetRequestMutation.isLoading || createAssetRequestMutation.isLoading
                }
              >
                {type === 'add' ? 'Add Asset Request' : 'Edit Asset Request'}
              </LoadingButton>
            </Stack>
          )}
        </Card>
      </Grid>
    </FormProvider>
  );
}

EditAssetRequest.propTypes = {
  row: PropTypes.object,
  type: PropTypes.object,
};

export default EditAssetRequest;
