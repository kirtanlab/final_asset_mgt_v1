import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/label';
import { alpha } from '@mui/material/styles';
import { fTimestamp } from 'src/utils/format-time';

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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

import CustomDialog from 'src/components/Dialog/dialog';
import RequestDetailsTableRow from './RequestDetailsTableRow';
import RequestTableFiltersResult from './request-table-filters-result';
import RequestTableToolbar from './request-table-toolbar';
import EditAssetRequest from './editRequest';
// import AddTypes from './addTypes';
const defaultFilters = {
  id: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  // { value: 'Pending', label: 'Pending' },
  // { value: 'Approved', label: 'Approved' },
  // { value: 'Cancelled', label: 'Cancelled' },
  // { value: 'PullBack', label: 'Pullback' },
  { value: 'Allocated', label: 'Allocated' },
  // { value: 'UNALLOCATED', label: 'Unallocated' },
  { value: 'Handover', label: 'Handover' },
  // { value: 'Rejected', label: 'Rejected' },
];

export default function RequestDetailsTable({ title, tableLabels, Request_data, subheader }) {
  const [filters, setFilters] = useState(defaultFilters);
  const table = useTable({ defaultOrderBy: 'required_by' });
  const confirm = useBoolean();
  // console.log('Request_Data: ' + JSON.stringify(Request_data));
  const [addTypes, setAddTypes] = useState(false);
  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = Request_data
    ? applyFilter({
      inputData: Request_data,
      comparator: getComparator(table.order, table.orderBy),
      filters,
      dateError,
    })
    : {};
  const denseHeight = table.dense ? 56 : 76;
  const canReset = filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);
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
  const handleFilterStatus = useCallback(
    (event, newValue) => {
      onFilters('status', newValue);
    },
    [onFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );
  return (
    <Card>
      {/* <Grid container alignItems="center" flexDirection="row">
                <CardHeader title={title} subheader={subheader} sx={{ flex: 1 }} />
            </Grid> */}
      <Tabs
        value={filters.status}
        onChange={handleFilterStatus}
        sx={{
          px: 2,
          boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={
                  ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                }
                color={
                  (tab.value === 'Approved' && 'success') ||
                  (tab.value === 'Pending' && 'warning') ||
                  (tab.value === 'Cancelled' && 'error') ||
                  (tab.value === 'PullBack' && 'info') ||
                  (tab.value === 'Allocated' && 'warning') ||
                  (tab.value === 'UNALLOCATED' && 'warning') ||
                  (tab.value === 'Handover' && 'success') ||
                  (tab.value === 'Rejected' && 'error') ||
                  'default'
                }
              >
                {tab.value === 'all' && Request_data.length}
                {tab.value === 'Approved' &&
                  Request_data.filter((order) => order.status?.status === 'Approved').length}

                {tab.value === 'Pending' &&
                  Request_data.filter((order) => order.status?.status === 'Pending').length}
                {tab.value === 'Cancelled' &&
                  Request_data.filter((order) => order.status?.status === 'Cancelled').length}
                {tab.value === 'PullBack' &&
                  Request_data.filter((order) => order.status?.status === 'PullBack').length}
                {tab.value === 'Allocated' &&
                  Request_data.filter((order) => order.status?.status === 'Allocated').length}
                {tab.value === 'UNALLOCATED' &&
                  Request_data.filter((order) => order.status?.status === 'UNALLOCATED').length}
                {tab.value === 'Handover' &&
                  Request_data.filter((order) => order.status?.status === 'Handover').length}
                {tab.value === 'Rejected' &&
                  Request_data.filter((order) => order.status?.status === 'Rejected').length}
              </Label>
            }
          />
        ))}
      </Tabs>
      <Grid container alignItems="center" flexDirection="row">
        <TextField
          value={filters.name}
          onChange={handleFilterName}
          placeholder="Search Request Details / Status ..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{}} />
              </InputAdornment>
            ),
          }}
          sx={{ p: 2, width: '40%', flex: 1 }}
        />
        <RequestTableToolbar
          filters={filters}
          onFilters={onFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
        />

        <Button
          sx={{ pt: 2, width: 200 }}
          size="medium"
          color="inherit"
          onClick={() => {
            setAddTypes(true);
          }}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          Add Request
        </Button>
      </Grid>
      {/* {canReset && (
        <RequestTableFiltersResult
          filters={filters}
          onFilters={onFilters}
          //
          onResetFilters={handleResetFilters}
          //
          results={dataFiltered.length}
          sx={{ p: 2.5, pt: 0 }}
        />
      )} */}
      <Grid sx={{}}>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={Request_data.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                Request_data.map((row) => row.id)
              )
            }
            action={
              <Stack sx={{ mr: 1 }}>
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
                rowCount={Request_data.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    Request_data.map((row) => row.id)
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
                    <RequestDetailsTableRow
                      key={row.id}
                      row={row}
                      table={table}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      confirm={confirm}
                    />
                  ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, Request_data.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dotted' }} />
        <CustomDialog
          openFlag={addTypes}
          setonClose={() => setAddTypes(false)}
          placeHolder="Add New Request"
          component={<EditAssetRequest type="add" />}
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

RequestDetailsTable.propTypes = {
  title: PropTypes.string,
  tableLabels: PropTypes.array,
  subheader: PropTypes.string,
  Request_data: PropTypes.array,
};
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  console.log('inputData', inputData);
  if (name) {
    inputData = inputData.filter(
      (request) =>
        request?.allocated_asset_id.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.reason.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.category_id?.category_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.asset_type_id?.type_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.classification_id?.class_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.location_id?.location_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.reporting_to_id?.employee_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        request?.employee?.employee_name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }
  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status?.status === status);
  }
  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (order) =>
          new Date(order?.required_by) >= new Date(startDate) &&
          new Date(order?.required_by) <= new Date(endDate)
      );
    }
  }
  return inputData;
}
