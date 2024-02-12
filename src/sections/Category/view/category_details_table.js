import { useState } from 'react';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// components
import { mock_tableData } from 'src/_mock/_tableData';
import { useSettingsContext } from 'src/components/settings';
import { getAllCategories } from 'src/queries/CategoryQueries';
import CategoryDetailsTable from '../CategoryDetailsTable';

// ----------------------------------------------------------------------

export default function AssetCategoryList() {
  const [AllCategory, setAllCategories] = useState([]);
  const settings = useSettingsContext();
  const getCategoryQuery = useQuery({
    queryKey: ['AllCategory'],
    queryFn: getAllCategories,
  });
  if (getCategoryQuery.status === 'loading') {
    console.log('Loading category');
  }
  if (getCategoryQuery.status === 'error') {
    console.log('Error', JSON.stringify(getCategoryQuery.error));
  }
  if (getCategoryQuery.status === 'success') {
    setAllCategories(getCategoryQuery.data);
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Assets Category Master </Typography>
      <Grid xs={12} marginTop={7} maxWidth={1200}>
        <CategoryDetailsTable
          title="Assets Categories Details"
          Categories_Data={AllCategory}
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
