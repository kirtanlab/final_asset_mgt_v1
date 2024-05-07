import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  TableCell,
  TableContainer,
  TableRow,
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
import { useCategoryContext } from 'src/context/CategoryContext';
import { useSnackbar } from 'src/components/snackbar';
import { useDeleteCategoryWithId } from 'src/queries/CategoryQueries';
import CustomDialog from 'src/components/Dialog/dialog';
import { LoadingScreen } from 'src/components/loading-screen';
import CategoryDetailsTableRow from './CategoryDetailsTableRow';
import AddCategories from './addCategories';
import CategoryTableToolbar from './category-table-toolbar';

export default function CategoryDetailsTable({
  title,
  tableLabels,
  table,
  Categories_Data: tableData,
  subheader,
}) {
  const defaultFilters = {
    name: '',
    active: 'All',
  };

  const [filters, setFilters] = useState(defaultFilters);
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useBoolean();
  const { setAddedFlag } = useCategoryContext();
  const [addCategory, setAddCategory] = useState(false);
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
    filters?.active !== 'all' ||
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
  const {
    mutateAsync: DeleteMutation,
    isLoading: DeleteLoading,
    isError: DeleteError,
    error: ResError,
    isSuccess: DeletedSuccess,
  } = useDeleteCategoryWithId();
  useEffect(() => {
    if (DeleteError) {
      enqueueSnackbar('Please check your internet connection!', {
        variant: 'error',
        color: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
    if (DeletedSuccess) {
      enqueueSnackbar('Category Deleted successfully!', {
        variant: 'success',
        color: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
  }, [enqueueSnackbar, DeleteError, DeletedSuccess]);
  // console.log('assets status', row.status);
  // if (DeleteLoading) {
  //   return (
  //     <Card>
  //       <Grid container alignItems="center" flexDirection="row">
  //         <LoadingScreen />
  //       </Grid>
  //     </Card>
  //   );
  // }
  return (
    <Card>
      <CategoryTableToolbar
        placeHolder="Search id / categories name / description ..."
        filters={filters}
        onFilters={onFilters}
      />

      <Grid sx={{ mt: 3 }}>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData?.length}
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
                {/* {DeleteLoading && (
                  <TableRow
                    sx={{
                      ...(denseHeight && {
                        denseHeight: denseHeight * (5 - tableData.length),
                      }),
                    }}
                  >
                    <TableCell colSpan={9}>
                      <LoadingScreen />
                    </TableCell>
                  </TableRow>
                )} */}
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <CategoryDetailsTableRow
                      key={row.id}
                      row={row}
                      table={table}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={DeleteMutation}
                      DeletedSuccess={DeletedSuccess}
                      DeleteLoading={DeleteLoading}
                      confirm={confirm}
                    />
                  ))}
                {/* {!notFound && ( */}
                <TableEmptyRows height={denseHeight} emptyRows={5 - tableData.length} />
                {/* )} */}

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dotted' }} />
        <CustomDialog
          openFlag={addCategory}
          setonClose={() => setAddCategory(false)}
          placeHolder="Add New Category"
          component={<AddCategories />}
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

CategoryDetailsTable.propTypes = {
  title: PropTypes.string,
  tableLabels: PropTypes.array,
  subheader: PropTypes.string,
  table: PropTypes.any,
  Categories_Data: PropTypes.array,
};
export function applyFilter({ inputData, comparator, filters }) {
  const { name, active } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  if (active !== 'All') {
    inputData = inputData.filter((category) => {
      const fieldValue = category.status ? 'Active' : 'Inactive';
      return fieldValue && fieldValue === active;
    });
  }
  if (name) {
    inputData = inputData.filter(
      (category) =>
        category.category_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        category.category_desc.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        category.id.toString().toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
