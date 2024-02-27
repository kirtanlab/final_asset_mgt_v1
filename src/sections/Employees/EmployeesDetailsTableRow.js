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
import CustomDialog from 'src/components/Dialog/dialog';
import EditEmployees from './editEmployees';

const EmployeeDetailsTableRow = ({
  row,
  selected,
  onSelectRow,
  onViewRow,
  actions_data,
  onEditRow,
  onDeleteRow,
  table,
  confirm,
}) => {
  const theme = useTheme();

  const [editEmployee, setEditEmployee] = useState(false);
  const popover = usePopover();
  const rowConfirm = useBoolean();

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
        <ListItemText
          primary={row?.status === true ? 'Active' : 'Inactive'}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
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
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
        {actions_data && 
        actions_data.map((_row) => {
          console.log('actions_data',actions_data)
          console.log('actions_data hehe ',_row);
          return (
      //   <ConfirmDialog
      //   open={rowConfirm.value}
      //   onClose={rowConfirm.onFalse}
      //         title={_row?.actionName}
      //   content={<>Are you sure want to delete this item?</>}
      //   action={
      //     <Button
      //       variant="contained"
      //       color="error"
      //       onClick={() => {
      //         rowConfirm.onFalse();
      //       }}
      //     >
      //       Delete
      //     </Button>
      //   }
            // />
            <>
        <MenuItem
          onClick={() => {
            setEditEmployee(true);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
                { _row?.actionName}
        </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />
              </>
      )})
      }
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
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              alert('Deleted');
              // handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />

      <ConfirmDialog
        open={rowConfirm.value}
        onClose={rowConfirm.onFalse}
        title="Delete"
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
      
    </TableRow>
  );
};

EmployeeDetailsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  table: PropTypes.any,
  confirm: PropTypes.object,
  actions_data: PropTypes.array
};

export default EmployeeDetailsTableRow;
