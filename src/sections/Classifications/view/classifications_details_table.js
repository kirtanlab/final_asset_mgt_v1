// @mui
import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { TableSkeleton, useTable } from 'src/components/table';
// components
import { useSettingsContext } from 'src/components/settings';
import { useGetAllClassification } from 'src/queries/ClassificationQueries';
import { mock_classifications_data } from 'src/_mock/_classifications';
import ClassificationsDetailsTable from '../ClassificationDetailsTable';
// ----------------------------------------------------------------------

export default function AssetClassesList() {
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });
  const {
    data: getAllClassificationData,
    error: getAllClassificationError,
    isLoading: getAllClassificationLoading,
  } = useGetAllClassification();
  console.log(
    'data,error,isLoading',
    getAllClassificationData,
    getAllClassificationError,
    getAllClassificationLoading
  );
  const [showAlert, setShowAlert] = useState(getAllClassificationError);

  const denseHeight = table.dense ? 56 : 76;

  if (getAllClassificationLoading) {
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Classification Master </Typography>
          <Grid xs={12} marginTop={2}>
            {[...Array(table.rowsPerPage)].map((i, index) => (
              <TableSkeleton key={index} sx={{ height: denseHeight }} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
  if (getAllClassificationError || getAllClassificationData === undefined) {
    console.log('in error!');
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Classification Master </Typography>
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
      <Typography variant="h4"> Assets Classification Master </Typography>
      <Grid xs={12} marginTop={2} maxWidth={1200}>
        <ClassificationsDetailsTable
          table={table}
          title="Assets Classifications Details"
          Classes_Data={getAllClassificationData.data}
          tableLabels={[
            { id: 'id', label: 'ID' },
            { id: 'class_name', label: 'Classifications name' },
            { id: 'class_desc', label: 'Classifications Description' },
            { id: 'asset_owner', label: 'Asset Owner' },
            { id: 'location', label: 'Location' },
            { id: 'location_owner', label: 'Location Owner' },
            { id: 'status', label: 'Status' },
            { id: '', label: '' },
          ]}
        />
      </Grid>
    </Container>
  );
}
