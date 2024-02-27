// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useAuthContext } from 'src/auth/hooks';
import { useSettingsContext } from 'src/components/settings';

import AnalyticsWidgetSummary from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  console.log('user', user);
  const md = 2;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            path="Category"
            title="Weekly Sales"
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Employees"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Locations"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Categories"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Types"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Classifications"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total requests"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={md}>
          <AnalyticsWidgetSummary
            title="Total Allocated Assets"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
