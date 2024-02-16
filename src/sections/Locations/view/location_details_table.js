import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { TableSkeleton, useTable } from 'src/components/table';
import { useGetAllLocations } from 'src/queries/LocationQueries';
import LocationDetailsTable from '../LocationsDetailsTable';

// ----------------------------------------------------------------------

export default function LocationList() {
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });
  const {
    data: AllLocationsData,
    error: AllCategoryError,
    isLoading: AllCategoryLoading,
  } = useGetAllLocations();
  console.log('data,error,isLoading', AllLocationsData, AllCategoryError, AllCategoryLoading);
  const denseHeight = table.dense ? 56 : 76;
  const EmptyTable = () => (
    <Grid xs={12} marginTop={2}>
      {[...Array(table.rowsPerPage)].map((i, index) => (
        <TableSkeleton key={index} sx={{ height: denseHeight }} />
      ))}
    </Grid>
  );

  if (AllCategoryLoading) {
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Location Master </Typography>
          <EmptyTable />
        </Container>
      </>
    );
  }
  if (AllCategoryError || AllLocationsData === undefined) {
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Location Master </Typography>
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => console.log('closed alert')}>
            <AlertTitle>Error</AlertTitle>
            Oops! Check your internet connectivity
          </Alert>
          <EmptyTable />
        </Container>
      </>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Assets Location Master </Typography>
      <Grid xs={12} marginTop={2}>
        <LocationDetailsTable
          table={table}
          title="Assets Location Details"
          locations_data={AllLocationsData.data}
          tableLabels={[
            { id: 'id', label: 'ID' },
            { id: 'location_name', label: 'Location name' },
            { id: 'company_name', label: 'Category name' },
            { id: 'department_name', label: 'Department name' },
            { id: 'status', label: 'Status' },
            { id: 'options', label: 'Options' },
          ]}
        />
      </Grid>
    </Container>
  );
}
