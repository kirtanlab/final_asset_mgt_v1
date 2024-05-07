import React, { useEffect, useState } from 'react';
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
import { LoadingScreen } from 'src/components/loading-screen';
import CustomDialog from 'src/components/Dialog/dialog';
import { useDeleteCategoryWithId, useDeleteCategoryWithIds } from 'src/queries/CategoryQueries';
import { useSnackbar } from 'src/components/snackbar';
import Label from 'src/components/label';
import { LoadingButton } from '@mui/lab';
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
  DeleteLoading,
  DeletedSuccess,
  confirm,
}) => {
  const [editCategory, setEditCategory] = useState(false);
  const popover = usePopover();
  const rowConfirm = useBoolean();
  const deleteCategoryWithIds = useDeleteCategoryWithIds();
  console.log('loading deletion:', DeleteLoading);
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
          sx={{ color: row?.status === true ? 'error.main' : 'success.main' }}
        >
          <Iconify
            icon={row?.status === false ? 'eva:done-all-outline' : 'solar:trash-bin-trash-bold'}
          />
          {row?.status === true ? 'Deactivate' : 'Active'}
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
        title={row?.status === true ? 'Deactivate' : 'Active'}
        content={
          <>
            Are you sure want to {row?.status === true ? 'deactivate' : 'activate'}
            <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color={row?.status === true ? 'error' : 'success'}
            onClick={async () => {
              try {
                const obj = {
                  ids: table.selected,
                };
                console.log('obj', obj);
                const res = await deleteCategoryWithIds.mutateAsync(obj);
                console.log('res: ', res);
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
            Deactivate
          </Button>
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

CategoryDetailsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  DeletedSuccess: PropTypes.func,
  DeleteLoading: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  table: PropTypes.any,
  confirm: PropTypes.object,
};

export default CategoryDetailsTableRow;
