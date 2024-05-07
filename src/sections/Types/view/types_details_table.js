import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import { TableSkeleton, useTable } from 'src/components/table';
import { useGetAllTypes } from 'src/queries/TypesQueries';
import TypesDetailsTable from '../TypesDetailsTable';

// ----------------------------------------------------------------------

export default function AssetCategoryList() {
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });
  const {
    data: getAllTypeData,
    error: getAllTypeError,
    isLoading: getAllTypeLoading,
    isSuccess: getAllTypeSuccess,
  } = useGetAllTypes();

  const [showAlert, setShowAlert] = useState(getAllTypeError);

  const denseHeight = table.dense ? 56 : 76;
  if (getAllTypeLoading || getAllTypeData.data.length === 0) {
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Types Master </Typography>
          <Grid xs={12} marginTop={2}>
            {[...Array(table.rowsPerPage)].map((i, index) => (
              <TableSkeleton key={index} sx={{ height: denseHeight }} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
  if (getAllTypeError || getAllTypeData === undefined) {
    console.log('in error!');
    return (
      <>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography variant="h4"> Assets Types Master </Typography>
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
  if (getAllTypeSuccess) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Assets Type Master </Typography>

        <Grid xs={12} marginTop={2} maxWidth={1200}>
          <TypesDetailsTable
            title="Assets Types Details"
            Categories_Data={getAllTypeData.data}
            tableLabels={[
              { id: 'id', label: 'ID' },
              { id: 'type_name', label: 'Type name' },
              { id: 'type_description', label: 'Type Description' },
              { id: 'classification_name', label: 'Classification Name' },
              { id: 'category_name', label: 'Category Name' },
              { id: 'status', label: 'Status' },
              { id: '', label: '' },
            ]}
          />
        </Grid>
      </Container>
    );
  }
}
