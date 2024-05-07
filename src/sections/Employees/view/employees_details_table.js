// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { TableSkeleton, useTable } from 'src/components/table';
import { useGetAllEmployees } from 'src/queries/EmployeeQueries';
import EmployeeDetailsTable from '../EmployeeDetailsTable';

export default function EmployeeList() {
  const settings = useSettingsContext();
  const table = useTable({ defaultOrderBy: 'id' });
  const {
    data: AllEmployeeData,
    error: AllEmployeeError,
    isLoading: AllEmployeeLoading,
    isSuccess: AllEmployeeSuccess,
  } = useGetAllEmployees();
  //  const actions_data = {
  //    "pending": [
  //         {
  //           "actionName": "pullback",
  //           "api_endpoint": "employee/updateStatus/pullback"
  //         }
  //       ],
  //       "pullback": [],
  //       "cancelled": [],
  //       "approved": [{
  //         "actionName":"cancelled",
  //         "api_endpoint": "employee/updateStatus/cancelled"
  //       }],
  //       "allocated": [],
  //       "rejected": []
  // }
  // const actions_data = [
  //    {
  //           "actionName": "pullback",
  //           "api_endpoint": "employee/updateStatus/pullback"
  //         }
  // ]
  const denseHeight = table.dense ? 56 : 76;
  if (AllEmployeeLoading) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Employee Master </Typography>
        <Grid xs={12} marginTop={2}>
          {[...Array(table.rowsPerPage)].map((i, index) => (
            <TableSkeleton key={index} sx={{ height: denseHeight }} />
          ))}
        </Grid>
      </Container>
    );
  }
  if (AllEmployeeError || AllEmployeeData === undefined) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Employee Master </Typography>
        <Grid xs={12} marginTop={2}>
          {[...Array(table.rowsPerPage)].map((i, index) => (
            <TableSkeleton key={index} sx={{ height: denseHeight }} />
          ))}
        </Grid>
      </Container>
    );
  }
  if (AllEmployeeSuccess) {
    console.log('data employees', AllEmployeeError, AllEmployeeData.data);
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Employee Master </Typography>
        <Grid xs={12} marginTop={2} maxWidth={1200}>
          <EmployeeDetailsTable
            title="Employee Details"
            table={table}
            // actions_data={ actions_data}
            employees_data={AllEmployeeData.data}
            tableLabels={[
              { id: 'id', label: 'ID' },
              { id: 'employee_name', label: 'Employee name' },
              { id: 'role', label: 'Role' },
              { id: 'employee_code', label: 'Employee code' },
              { id: 'employee_dept', label: 'Employee department' },
              { id: 'status', label: 'Status' },
              { id: 'Options', label: 'Options' },
            ]}
          />
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Employee Master </Typography>
      <Grid xs={12} marginTop={2}>
        {[...Array(table.rowsPerPage)].map((i, index) => (
          <TableSkeleton key={index} sx={{ height: denseHeight }} />
        ))}
      </Grid>
    </Container>
  );
}
