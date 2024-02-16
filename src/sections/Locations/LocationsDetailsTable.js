import React, { useCallback, useRef, useState } from 'react';
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
import Scrollbar from 'src/components/scrollbar';
import TableHeadCustom from 'src/components/table/table-head-custom';
import {
  TableEmptyRows,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  getComparator,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomDialog from 'src/components/Dialog/dialog';
import LocationDetailsTableRow from './LocationsDetailsTableRow';
import AddLocations from './addLocations';

export default function LocationDetailsTable({
  title,
  table,
  tableLabels,
  locations_data: tableData,
  subheader,
}) {
  const defaultFilters = {
    location_name: '',
  };

  const [filters, setFilters] = useState(defaultFilters);
  const confirm = useBoolean();

  const [addLocation, setAddLocation] = useState(false);
  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters,
      })
    : {};
  const denseHeight = table.dense ? 56 : 76;
  const canReset =
    !!filters.name ||
    !!filters.service?.length ||
    filters.status !== 'all' ||
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
  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );
  // console.log('empty row for location', emptyRows(table.page, table.rowsPerPage, tableData.length));
  return (
    <Card>
      <Grid container alignItems="center" flexDirection="row">
        <CardHeader title={title} subheader={subheader} sx={{ flex: 1 }} />
        <Stack sx={{ paddingTop: 3, flexDirection: 'row', flex: 2, marginRight: 6 }}>
          <Stack sx={{ width: '100%', paddingRight: 2 }}>
            <TextField
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search id / location name / department name / company name..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{}} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '100%' }}
            />
          </Stack>

          <Button
            sx={{ pt: 2, width: 200 }}
            size="medium"
            color="inherit"
            onClick={() => {
              setAddLocation(true);
            }}
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          >
            Add Locations
          </Button>
        </Stack>
      </Grid>
      <Grid sx={{ mt: 3 }}>
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
                    <LocationDetailsTableRow
                      key={row.id}
                      row={row}
                      table={table}
                      selected={table.selected.includes(row.id)}
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
          openFlag={addLocation}
          setonClose={() => setAddLocation(false)}
          placeHolder="Add New Location"
          component={<AddLocations />}
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

LocationDetailsTable.propTypes = {
  title: PropTypes.string,
  tableLabels: PropTypes.array,
  subheader: PropTypes.string,
  locations_data: PropTypes.array,
  table: PropTypes.any,
};
function applyFilter({ inputData, comparator, filters }) {
  const { name } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (location) =>
        location.location_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        location.department_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        location.company_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        location.id.toString().toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
