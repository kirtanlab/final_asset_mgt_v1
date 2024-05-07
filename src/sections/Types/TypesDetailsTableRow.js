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
import Label from 'src/components/label';
import EditTypes from './editTypes';
// import { ConfirmDialog } from 'src/components/custom-dialog';

const TypesDetailsTableRow = ({
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

  const [editTypes, setEditTypes] = useState(false);
  const popover = usePopover();
  const rowConfirm = useBoolean();

  console.log('assets status', row);
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
          primary={row?.type_name}
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
          primary={row?.type_desc}
          primaryTypographyProps={{ typography: 'body2', noWrap: false }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={row?.class_id.class_name}
          primaryTypographyProps={{ typography: 'body2', noWrap: false }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={row?.category_id?.category_name}
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
            setEditTypes(true);
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
        openFlag={editTypes}
        setonClose={() => setEditTypes(false)}
        placeHolder="Edit Types"
        component={<EditTypes row={row} />}
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
                // const res = await deleteCategoryWithIds.mutateAsync(obj);
                // console.log('res: ', res);
                confirm.onFalse();
                table.setSelected([]);
                rowConfirm.onFalse();
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

TypesDetailsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  table: PropTypes.any,
  confirm: PropTypes.object,
};

export default TypesDetailsTableRow;
