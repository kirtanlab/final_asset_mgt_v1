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
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import CategoryDetailsTable from '../CategoryDetailsTable';

// ----------------------------------------------------------------------

export default function AssetCategoryList() {
  const settings = useSettingsContext();
  const {
    data: getAllCategoryData,
    error: getAllCategoryError,
    isLoading: getAllCategoryLoading,
  } = useGetAllCategories();

  if (getAllCategoryLoading) {
    return <h1>Loading...</h1>;
  }
  if (getAllCategoryError || getAllCategoryData === undefined) {
    return <h1>Error</h1>;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Assets Category Master </Typography>
      <Grid xs={12} marginTop={2}>
        <CategoryDetailsTable
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
