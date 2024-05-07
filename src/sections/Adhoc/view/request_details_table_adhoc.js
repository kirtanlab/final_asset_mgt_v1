import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Grid } from '@mui/material';
// components
import { mock_req_data } from 'src/_mock/_req';
import { useSettingsContext } from 'src/components/settings';
import { useAuth } from 'src/auth/context/jwt/auth-provider';
import { TableSkeleton, useTable } from 'src/components/table';
import {
  useGetAllAdhocAssetRequests,
  useGetAllAssetRequests,
} from 'src/queries/AssetRequestQueries';
import RequestDetailsTable from '../RequestDetailsTable';

const RequestListAdhoc = () => {
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });

  const {
    data: AllRequestsData,
    error: AllRequestsError,
    isLoading: AllReaquestIsLoading,
    isSuccess: AllRequestsIsSuccess,
  } = useGetAllAdhocAssetRequests();
  const denseHeight = table.dense ? 56 : 76;

  console.log('inside reuqest table: ', AllRequestsData);
  if (AllReaquestIsLoading) {
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Adhoc Assets Request </Typography>
          <Grid xs={12} marginTop={2}>
            {[...Array(table.rowsPerPage)].map((i, index) => (
              <TableSkeleton key={index} sx={{ height: denseHeight }} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
  if (AllRequestsError || AllRequestsData === undefined) {
    console.log('in error!', AllRequestsError);
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4">Adhoc Assets Request</Typography>
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
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Adhoc Assets Request Master </Typography>
      <Grid xs={12} marginTop={2}>
        <RequestDetailsTable
          title="Assets Request Details"
          Request_data={AllRequestsData.data}
          tableLabels={[
            { id: 'id', label: 'ID' },
            { id: 'details', label: 'Request Details' },
            { id: 'reason', label: 'Reason' },
            { id: 'required_by', label: 'Required Date' },
            // { id: 'type_id', label: 'Type ID' },
            // { id: 'category_id', label: 'Category ID' },
            // { id: 'classification_id', label: 'Classification ID' },
            { id: 'employee_name', label: 'Employee' },
            { id: 'location_name', label: 'Location' },
            { id: 'reporting_to_name', label: 'Reporting To' },
            { id: 'status', label: 'Status' },
            { id: 'Options', label: 'Options' },
          ]}
        />
      </Grid>
    </Container>
  );
};

export default RequestListAdhoc;
