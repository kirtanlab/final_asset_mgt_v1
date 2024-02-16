// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components
import { mock_types_data } from 'src/_mock/_types';
import { useSettingsContext } from 'src/components/settings';
import TypesDetailsTable from '../TypesDetailsTable';

// ----------------------------------------------------------------------

export default function AssetTypeList() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Assets Type Master </Typography>

      <Grid xs={12} marginTop={2} maxWidth={1200}>
        <TypesDetailsTable
          title="Assets Types Details"
          Categories_Data={mock_types_data}
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
