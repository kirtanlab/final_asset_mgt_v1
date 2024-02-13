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
import { useDeleteCategoryWithId } from 'src/queries/CategoryQueries';

import EditCategories from './editCategories';

// import { ConfirmDialog } from 'src/components/custom-dialog';

const CategoryDetailsTableRow = ({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  table,
  confirm,
}) => {
  const theme = useTheme();
  const deleteCategoryWithId = useDeleteCategoryWithId();
  const [editCategory, setEditCategory] = useState(false);
  const popover = usePopover();
  const rowConfirm = useBoolean();
  console.log('assets status', row.status);
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

      <TableCell width={200}>
        <ListItemText
          primary={row?.category_name}
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
          primary={row?.category_desc}
          primaryTypographyProps={{ typography: 'body2', noWrap: false }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell width={100}>
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
            setEditCategory(true);
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
      </CustomPopover>
      <CustomDialog
        openFlag={editCategory}
        setonClose={() => setEditCategory(false)}
        placeHolder="Edit Category"
        component={<EditCategories row={row} />}
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
            onClick={async () => {
              try {
                await deleteCategoryWithId.mutateAsync(row.id);
                rowConfirm.onFalse();
              } catch (error) {
                alert('Check your internet connectivity');
                console.log('error in handleSubmit of Add Categories');
                console.log('error: ', error);
              }
            }}
          >
            Delete
          </Button>
        }
      />
    </TableRow>
  );
};

CategoryDetailsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  table: PropTypes.any,
  confirm: PropTypes.object,
};

export default CategoryDetailsTableRow;
