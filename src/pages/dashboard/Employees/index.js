import { Helmet } from 'react-helmet-async';

import EmployeeList from 'src/sections/Employees/view/employees_details_table';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Employees Master</title>
      </Helmet>

      <EmployeeList />
    </>
  );
}
