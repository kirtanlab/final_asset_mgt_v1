import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useDeleteEmployeeWithId, useDeleteEmployeeWithIds } from 'src/queries/EmployeeQueries';
import CustomDialog from 'src/components/Dialog/dialog';
import Label from 'src/components/label';
import { LoadingButton } from '@mui/lab';
import EditEmployees from './editEmployees';

const EmployeeDetailsTableRow = ({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  DeleteLoading,
  DeletedSuccess,
  table,
  confirm,
}) => {
  const theme = useTheme();

  const [editEmployee, setEditEmployee] = useState(false);
  const popover = usePopover();
  const rowConfirm = useBoolean();
  const deleteEmployeeWithIds = useDeleteEmployeeWithIds();
  const deleteEmployeeWithId = useDeleteEmployeeWithId();
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={row?.id}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={row?.employee_name}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={row?.role}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={row?.employeeCode}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={row?.employee_dept}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <Label variant="soft" color={(row?.status === true ? 'success' : 'error') || 'default'}>
          <ListItemText
            primary={row?.status === true ? 'Active' : 'Inactive'}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </Label>
      </TableCell>
      <TableCell sx={{ pr: 0 }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {/* <MenuItem
          onClick={() => {
            // onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            setEditEmployee(true);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            // confirm.onTrue();
            rowConfirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: row?.status === true ? 'error.main' : 'success.main' }}
        >
          <Iconify
            icon={row?.status === true ? 'eva:done-all-outline' : 'solar:trash-bin-trash-bold'}
          />
          {row?.status === true ? 'Deactivate' : 'Active'}
        </MenuItem>
        {/* {actions_data &&
          actions_data.map((_row) => {
            console.log('actions_data', actions_data)
            console.log('actions_data hehe ', _row);
            return (
                <ConfirmDialog
                open={rowConfirm.value}
                onClose={rowConfirm.onFalse}
                      title={_row?.actionName}
                content={<>Are you sure want to delete this item?</>}
                action={
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      rowConfirm.onFalse();
                    }}
                  >
                    Delete
                  </Button>
                }
              />
              <>
                <MenuItem
                  onClick={() => {
                    setEditEmployee(true);
                    popover.onClose();
                  }}
                >
                  <Iconify icon="solar:pen-bold" />
                  {_row?.actionName}
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />
              </>
            )
          })
        } */}
      </CustomPopover>
      <CustomDialog
        openFlag={editEmployee}
        setonClose={() => setEditEmployee(false)}
        placeHolder="Edit Employee"
        component={<EditEmployees row={row} />}
      />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Deactivate"
        content={
          <>
            Are you sure want to Deactivate the Employee <strong> {table.selected.length} </strong>{' '}
            items?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={async () => {
              try {
                const obj = {
                  ids: table.selected,
                };
                console.log('obj', obj);
                await deleteEmployeeWithIds.mutateAsync(obj);
                confirm.onFalse();
                table.setSelected([]);
              } catch (error) {
                alert('Check your internet connectivity');
                console.log('error in handleSubmit of delete Categories');
                console.log('error: ', error);
                confirm.onFalse();
              }
            }}
          >
            Deacitvate
          </LoadingButton>
        }
      />

      <ConfirmDialog
        open={rowConfirm.value}
        onClose={rowConfirm.onFalse}
        title={row?.status === true ? 'Deactivate' : 'Active'}
        content={
          <>Are you sure want to {row?.status === true ? 'deactivate' : 'activate'} this item?</>
        }
        action={
          <LoadingButton
            variant="contained"
            loading={DeleteLoading}
            color={row?.status === true ? 'error' : 'success'}
            onClick={async () => {
              try {
                const res = await onDeleteRow(row.id);
                rowConfirm.onFalse();

                console.log('res: ', res);
              } catch (error) {
                alert('Check your internet connectivity');
                console.log('error in handleSubmit of Add Categories');
                console.log('error: ', error);
              }
            }}
          >
            {row?.status === true ? 'Deactivate' : 'Activate'}
          </LoadingButton>
        }
      />
    </TableRow>
  );
};

EmployeeDetailsTableRow.propTypes = {
  DeleteLoading: PropTypes.func,
  DeletedSuccess: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  table: PropTypes.any,
  confirm: PropTypes.object,
};

export default EmployeeDetailsTableRow;
