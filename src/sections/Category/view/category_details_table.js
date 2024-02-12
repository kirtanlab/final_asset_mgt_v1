// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// components
import { mock_tableData } from 'src/_mock/_tableData';
import { useSettingsContext } from 'src/components/settings';
import CategoryDetailsTable from '../CategoryDetailsTable';
// ----------------------------------------------------------------------

export default function AssetCategoryList() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Assets Category Master </Typography>
      <Grid xs={12} marginTop={7} maxWidth={1200}>
        <CategoryDetailsTable
          title="Assets Categories Details"
          Categories_Data={mock_tableData}
          tableLabels={[
            { id: 'id', label: 'ID' },
            { id: 'category_name', label: 'Category name' },
            { id: 'category_description', label: 'Category Description' },
            { id: 'status', label: 'Status' },
            { id: '', label: '' },
          ]}
        />
      </Grid>
    </Container>
  );
}
