// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components

import { useSettingsContext } from 'src/components/settings';

import { mock_classifications_data } from 'src/_mock/_classifications';
import ClassificationsDetailsTableRow from '../ClassificationsDetailsTableRow';
// ----------------------------------------------------------------------

export default function AssetClassesList() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Assets Category Master </Typography>
      <Grid xs={12} marginTop={2} maxWidth={1200}>
        <ClassificationsDetailsTableRow
          title="Assets Classifications Details"
          Classes_Data={mock_classifications_data}
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
