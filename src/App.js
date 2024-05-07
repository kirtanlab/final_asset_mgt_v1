// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// ----------------------------------------------------------------------

// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CategoryProvider } from './context/CategoryContext';
import { SnackbarProvider } from './components/snackbar';
import { ClassficationProvider } from './context/ClassificationContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { LocationProvider } from './context/LocationContext';
// ----------------------------------------------------------------------

export default function App() {
  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██

  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();
  const seconds = 1000;
  const _queryClient = new QueryClient({
    defaultOptions: {
      cacheTime: 60 * seconds,
      staleTime: 60 * seconds,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: true,
    },
  });

  return (
    <QueryClientProvider client={_queryClient}>
      <CategoryProvider>
        <ClassficationProvider>
          <LocationProvider>
            <EmployeeProvider>
              <AuthProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <SettingsProvider
                    defaultSettings={{
                      themeMode: 'light', // 'light' | 'dark'
                      themeDirection: 'ltr', //  'rtl' | 'ltr'
                      themeContrast: 'default', // 'default' | 'bold'
                      themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                      themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                      themeStretch: false,
                    }}
                  >
                    <ThemeProvider>
                      <MotionLazy>
                        <SnackbarProvider>
                          <SettingsDrawer />
                          <ProgressBar />
                          <AuthConsumer>
                            <Router />
                          </AuthConsumer>
                        </SnackbarProvider>
                      </MotionLazy>
                    </ThemeProvider>
                  </SettingsProvider>
                </LocalizationProvider>
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </EmployeeProvider>
          </LocationProvider>
        </ClassficationProvider>
      </CategoryProvider>
    </QueryClientProvider>
  );
}
