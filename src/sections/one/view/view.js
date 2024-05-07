// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useAuthContext } from 'src/auth/hooks';
import { useSettingsContext } from 'src/components/settings';

import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import { useGetAllCategories } from 'src/queries/CategoryQueries';
import { useGetCount } from 'src/queries/AssetRequestQueries';
import AnalyticsWidgetSummary from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const {
    data: getAllCategoryData,
    error: getAllCategoryError,
    isLoading: getAllCategoryLoading,
    isSuccess: getAllCategorySuccess,
  } = useGetCount();

  const md = 2;
  if (getAllCategoryLoading) return <LoadingScreen />;
  console.log('count', getAllCategoryData);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Employees"
            total={getAllCategoryData?.employeeCount ? getAllCategoryData?.employeeCount : 0}
            href="Employees"
            color="info"
          // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Locations"
            total={getAllCategoryData?.locationCount ? getAllCategoryData?.locationCount : 0}
            color="warning"
            href="Locations"
          // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Categories"
            total={getAllCategoryData?.categoryCount ? getAllCategoryData?.categoryCount : 0}
            color="error"
            href="Category"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Types"
            total={getAllCategoryData?.typeCount ? getAllCategoryData?.typeCount : 0}
            color="error"
            href="Types"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Classifications"
            total={getAllCategoryData?.classCount ? getAllCategoryData?.classCount : 0}
            color="error"
            href="Classifications"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total requests"
            href="AssetRequest"
            total={
              getAllCategoryData?.assetRequestCount ? getAllCategoryData?.assetRequestCount : 0
            }
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Allocated Assets"
            href="AssetRequest"
            total={getAllCategoryData.assetRequestCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Adhoc Requests"
            href="Adhoc_Asset_Request"
            total={getAllCategoryData?.adhocCount ? getAllCategoryData?.adhocCount : 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
