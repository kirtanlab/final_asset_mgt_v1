// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    Category: `${ROOTS.DASHBOARD}/Category`,
    Types: `${ROOTS.DASHBOARD}/Types`,
    Classifications: `${ROOTS.DASHBOARD}/Classifications`,
    Employees: `${ROOTS.DASHBOARD}/Employees`,
    Locations: `${ROOTS.DASHBOARD}/Locations`,
  },
};
