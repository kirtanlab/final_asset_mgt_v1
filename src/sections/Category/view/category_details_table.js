import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import { TableSkeleton, useTable } from 'src/components/table';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCategories } from 'src/apis/CategoryApis';
import CategoryDetailsTable from '../CategoryDetailsTable';

// ----------------------------------------------------------------------

export default function AssetCategoryList() {
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });
  const queryClient = useQueryClient();
  // const {
  // data: getAllCategoryData,
  // error: getAllCategoryError,
  // isLoading: getAllCategoryLoading,
  // isSuccess: getAllCategorySuccess,
  // } = useGetAllCategories();
  const seconds = 1000;
  const {
    data: getAllCategoryData,
    error: getAllCategoryError,
    isLoading: getAllCategoryLoading,
    isSuccess: getAllCategorySuccess,
    isFetching: getAllCategoryFetching,
    isRefetching: getAllCategoryRefetching,
  } = useQuery(['AllCategory'], getAllCategories, {
    cacheTime: 60 * seconds,
    staleTime: 60 * seconds,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: true,
    retry: true,
  });
  const data = queryClient.getQueryData(['AllCategory']);
  console.log('data from queryClient: ', getAllCategoryFetching, getAllCategoryLoading);
  const [showAlert, setShowAlert] = useState(getAllCategoryError);

  const denseHeight = table.dense ? 56 : 76;
  if (getAllCategoryLoading || getAllCategoryData.data.length === 0) {
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Category Master </Typography>
          <Grid xs={12} marginTop={2}>
            {[...Array(table.rowsPerPage)].map((i, index) => (
              <TableSkeleton key={index} sx={{ height: denseHeight }} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
  if (getAllCategoryError || getAllCategoryData === undefined) {
    console.log('in error!');
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Category Master </Typography>
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => console.log('closed alert')}>
            <AlertTitle>Error</AlertTitle>
            Oops! Check your internet connectivity
          </Alert>
          <Grid xs={12} marginTop={2}>
            {[...Array(table.rowsPerPage)].map((i, index) => (
              <TableSkeleton key={index} sx={{ height: denseHeight }} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
  if (getAllCategorySuccess) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Assets Category Master </Typography>
        <Grid xs={12} marginTop={2}>
          <CategoryDetailsTable
            table={table}
            title="Assets Categories Details"
            Categories_Data={getAllCategoryData.data}
            tableLabels={[
              { id: 'id', label: 'ID' },
              { id: 'category_name', label: 'Category name' },
              { id: 'category_description', label: 'Category Description' },
              { id: 'status', label: 'Status' },
              { id: 'options', label: 'Options' },
            ]}
          />
        </Grid>
      </Container>
    );
  }
}
