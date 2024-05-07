import React, { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Tooltip,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { Searchbar } from 'src/layouts/_common';
import Scrollbar from 'src/components/scrollbar';
import { Tab } from '@mui/base';
import TableHeadCustom from 'src/components/table/table-head-custom';
import {
  TableEmptyRows,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSnackbar } from 'src/components/snackbar';
import CustomDialog from 'src/components/Dialog/dialog';
import { useDeleteEmployeeWithId } from 'src/queries/EmployeeQueries';
import { label } from 'yet-another-react-lightbox';
import AddEmployee from './addEmployees';
import EmployeeDetailsTableRow from './EmployeesDetailsTableRow';
import EmployeeTableToolbar from './employee-table-toolbar';

export default function EmployeeDetailsTable({
  title,
  table,
  tableLabels,
  // actions_data,
  employees_data: tableData,
  subheader,
}) {
  const defaultFilters = {
    employees_name: '',
    active: 'All',
  };
  const STATUS_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];
  const [filters, setFilters] = useState(defaultFilters);
  const confirm = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const [addEmployee, setAddEmployee] = useState(false);
  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters,
      })
    : {};
  const denseHeight = table.dense ? 56 : 76;
  const canReset =
    !!filters.employees_name ||
    !!filters.service?.length ||
    filters.active !== 'All' ||
    (!!filters.startDate && !!filters.endDate);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;
  const onFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  // }, []);

  const {
    mutateAsync: DeleteMutation,
    isLoading: DeleteLoading,
    isError: DeleteError,
    error: ResError,
    isSuccess: DeletedSuccess,
  } = useDeleteEmployeeWithId();
  useEffect(() => {
    if (DeleteError) {
      enqueueSnackbar('Please check your internet connection!', {
        variant: 'error',
        color: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
    if (DeletedSuccess) {
      enqueueSnackbar('Employee Deactivated successfully!', {
        variant: 'success',
        color: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  }, [enqueueSnackbar, DeleteError, DeletedSuccess]);
  // console.log('empty row for employee', emptyRows(table.page, table.rowsPerPage, tableData.length));
  return (
    <Card>
      <EmployeeTableToolbar
        filters={filters}
        onFilters={onFilters}
        placeHolder="Find Employee ..."
      />
      {/* {canReset && (
          <ProductTableFiltersResult
            filters={filters}
            onFilters={onFilters}
            //
            onResetFilters={handleResetFilters}
            //
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )} */}
      <Grid>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
            action={
              <Stack sx={{ mr: 3.5 }}>
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          />
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                headLabel={tableLabels}
                order={table.order}
                orderBy={table.orderBy}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <EmployeeDetailsTableRow
                      key={row.id}
                      row={row}
                      // actions_data={actions_data}
                      table={table}
                      selected={table.selected.includes(row.id)}
                      onDeleteRow={DeleteMutation}
                      DeleteLoading={DeleteLoading}
                      DeletedSuccess={DeletedSuccess}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      confirm={confirm}
                    />
                  ))}
                <TableEmptyRows height={denseHeight} emptyRows={5 - tableData.length} />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dotted' }} />
        <CustomDialog
          openFlag={addEmployee}
          setonClose={() => setAddEmployee(false)}
          placeHolder="Add New Employee"
          component={<AddEmployee />}
        />
        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          dense={table.dense}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          onChangeDense={table.onChangeDense}
        />
      </Grid>
    </Card>
  );
}

EmployeeDetailsTable.propTypes = {
  title: PropTypes.string,
  tableLabels: PropTypes.array,
  subheader: PropTypes.string,
  employees_data: PropTypes.array,
  table: PropTypes.any,
  // actions_data: PropTypes.array
};
function applyFilter({ inputData, comparator, filters }) {
  const { employees_name, active } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  // if (status.length) {
  //   inputData = inputData.filter((product) => status.includes(product.status));
  // }
  if (active !== 'All') {
    inputData = inputData.filter((employee) => {
      const fieldValue = employee.status ? 'Active' : 'Inactive';
      return fieldValue && fieldValue === active;
    });
  }

  if (employees_name) {
    inputData = inputData.filter(
      (employee) =>
        employee?.employee_name.toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
        employee?.employeeCode.toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
        employee?.employee_dept.toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
        employee?.id.toString().toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
        employee?.role.toString().toLowerCase().indexOf(employees_name.toLowerCase()) !== -1
    );
    console.log('inputData: ', inputData);
    // inputData = inputData.filter((employee) => {

    // employee.employee_name.toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
    //   employee.employee_code.toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
    //   employee.employee_dept.toLowerCase().indexOf(employees_name.toLowerCase()) !== -1 ||
    //   employee.id.toString().toLowerCase().indexOf(employees_name.toLowerCase()) !== -1;
    // });
  }

  return inputData;
}
