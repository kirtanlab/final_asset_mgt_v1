import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// theme
import { bgGradient } from 'src/theme/css';
// utils
import { fShortenNumber } from 'src/utils/format-number';
import { Link } from '@mui/material';
import { RouterLink } from 'src/routes/components';
// theme

// ----------------------------------------------------------------------

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon,
  path,
  color = 'primary',
  sx,
  ...other
}) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        py: 1,
        px: 1,
        borderRadius: 2,
        textAlign: 'center',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Link
        href="Types"
        // target="_blank"
        // rel="noopener"
        component={RouterLink}
        underline="none"
        sx={{
          width: 1,
          ...(false && {
            cursor: 'default',
          }),
          color: `${color}.darker`,
        }}
      >
        {icon && <Box sx={{ width: 50, height: 50, mb: 1 }}>{icon}</Box>}

        <Typography variant="h3">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
          {title}
        </Typography>
      </Link>
    </Stack>
  );
}

AnalyticsWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  path: PropTypes.string,
};
