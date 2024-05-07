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
import { fDate } from 'src/utils/format-time';
import {
  useAllocateRequest,
  useApproveRequest,
  useCancelRequest,
  useHandoverRequest,
  usePullbackRequest,
  useRejectRequest,
} from 'src/queries/AssetRequestQueries';
import { LoadingButton } from '@mui/lab';
import Label from 'src/components/label';
import EditAssetRequest from './editRequest';
// import EditTypes from './editTypes';
// import { ConfirmDialog } from 'src/components/custom-dialog';

const RequestDetailsTableRow = ({
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
  const [viewTypes, setViewTypes] = useState(false);
  console.log('row: ', row);
  const [editTypes, setEditTypes] = useState(false);
  const popover = usePopover();
  const rowConfirm = useBoolean();
  const approveConfirm = useBoolean();
  const RejectConfirm = useBoolean();
  const AllocateConfirm = useBoolean();
  const PullbackConfirm = useBoolean();
  const CancelConfirm = useBoolean();
  const HandOverConfirm = useBoolean();

  const {
    mutateAsync: AllocateMutation,
    isLoading: AllocateIsLoading,
    isSuccess: AllocateIsSuccess,
    error: AllocateError,
  } = useAllocateRequest();
  const {
    mutateAsync: ApproveMutation,
    isLoading: ApproveIsLoading,
    isSuccess: ApproveIsSuccess,
    error: ApproveError,
  } = useApproveRequest();
  const {
    mutateAsync: RejectMutation,
    isLoading: RejectIsLoading,
    isSuccess: RejectIsSuccess,
    error: RejectError,
  } = useRejectRequest();
  const {
    mutateAsync: PullbackMutation,
    isLoading: PullbackIsLoading,
    isSuccess: PullbackIsSuccess,
    error: PullbackError,
  } = usePullbackRequest();
  const {
    mutateAsync: CancelMutation,
    isLoading: CancelIsLoading,
    isSuccess: CancelIsSuccess,
    error: CancelError,
  } = useCancelRequest();
  const {
    mutateAsync: HandoverMutation,
    isLoading: HandoverIsLoading,
    isSuccess: HandoverIsSuccess,
    error: HandoverError,
  } = useHandoverRequest();

  // console.log('assets status', row);
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
          primary={row?.details}
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
          primary={row?.reason}
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
          primary={fDate(row?.required_by)}
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
          primary={row?.employee?.employee_name}
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
          primary={row?.location_id?.location_name}
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
          primary={row?.reporting_to_id?.employee_name}
          primaryTypographyProps={{ typography: 'body2', noWrap: false }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <Label
          // primary={row?.status?.status}
          // primaryTypographyProps={{ typography: 'body2', noWrap: false }}
          // secondaryTypographyProps={{
          //   mt: 0.5,
          //   component: 'span',
          //   typography: 'caption',
          // }}
          variant="soft"
          color={
            (row?.status?.status === 'Approved' && 'success') ||
            (row?.status?.status === 'Pending' && 'warning') ||
            (row?.status?.status === 'Cancelled' && 'error') ||
            (row?.status?.status === 'PullBack' && 'info') ||
            (row?.status?.status === 'Allocated' && 'warning') ||
            (row?.status?.status === 'UNALLOCATED' && 'warning') ||
            (row?.status?.status === 'Handover' && 'info') ||
            (row?.status?.status === 'Rejected' && 'error') ||
            'default'
          }
        >
          {row?.status?.status}
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
        <MenuItem
          onClick={() => {
            // onViewRow();
            setViewTypes(true);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

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
            approveConfirm.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="eva:done-all-outline" />
          Approve
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            // confirm.onTrue();
            RejectConfirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:minus-circle-outline" />
          Reject
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            // confirm.onTrue();
            PullbackConfirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:scissors-outline" />
          Pullback
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            // confirm.onTrue();
            CancelConfirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:alert-circle-outline" />
          Cancel
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            // confirm.onTrue();
            AllocateConfirm.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="eva:arrowhead-up-outline" />
          Allocate
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            // confirm.onTrue();
            HandOverConfirm.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="eva:alert-circle-outline" />
          Handover
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
        openFlag={editTypes}
        setonClose={() => setEditTypes(false)}
        placeHolder="Edit Asset Request"
        component={<EditAssetRequest row={row} type="edit" />}
      />
      <CustomDialog
        openFlag={viewTypes}
        setonClose={() => setViewTypes(false)}
        placeHolder="View Asset Request"
        component={<EditAssetRequest row={row} type="view" />}
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
        content={<>Are you sure want to delete this request?</>}
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
      <ConfirmDialog
        open={approveConfirm.value}
        onClose={approveConfirm.onFalse}
        title="Approve"
        content={<>Are you sure want to approve this request?</>}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            onClick={async () => {
              await ApproveMutation(row?.id);
              approveConfirm.onFalse();
            }}
            // disabled={ApproveIsSuccess}
            loading={ApproveIsLoading}
          >
            Approve
          </LoadingButton>
        }
      />
      <ConfirmDialog
        open={AllocateConfirm.value}
        onClose={AllocateConfirm.onFalse}
        title="Allocate"
        content={<>Are you sure want to Allocate this request?</>}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            onClick={async () => {
              await AllocateMutation(row?.id);
              AllocateConfirm.onFalse();
            }}
            // disabled={AllocateIsSuccess}
            loading={AllocateIsLoading}
          >
            Allocate
          </LoadingButton>
        }
      />
      <ConfirmDialog
        open={HandOverConfirm.value}
        onClose={HandOverConfirm.onFalse}
        title="Handover"
        content={<>Are you sure want to Handover this request?</>}
        action={
          <LoadingButton
            variant="contained"
            color="success"
            onClick={async () => {
              await HandoverMutation(row?.id);
              HandOverConfirm.onFalse();
            }}
            // disabled={HandoverIsSuccess}
            loading={HandoverIsLoading}
          >
            Handover
          </LoadingButton>
        }
      />
      <ConfirmDialog
        open={RejectConfirm.value}
        onClose={RejectConfirm.onFalse}
        title="Reject"
        content={<>Are you sure want to reject this request?</>}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={async () => {
              await RejectMutation(row?.id);
              RejectConfirm.onFalse();
            }}
            // disabled={RejectIsSuccess}
            loading={RejectIsLoading}
          >
            Reject
          </LoadingButton>
        }
      />
      <ConfirmDialog
        open={CancelConfirm.value}
        onClose={CancelConfirm.onFalse}
        title="Cancel"
        content={<>Are you sure want to cancel this request?</>}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={async () => {
              await CancelMutation(row?.id);
              CancelConfirm.onFalse();
            }}
            // disabled={CancelIsSuccess}
            loading={CancelIsLoading}
          >
            Cancel
          </LoadingButton>
        }
      />
      <ConfirmDialog
        open={PullbackConfirm.value}
        onClose={PullbackConfirm.onFalse}
        title="Pullback"
        content={<>Are you sure want to pullback this request?</>}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={async () => {
              await PullbackMutation(row?.id);
              PullbackConfirm.onFalse();
            }}
            // disabled={PullbackIsSuccess}
            loading={PullbackIsLoading}
          >
            Pullback
          </LoadingButton>
        }
      />
    </TableRow>
  );
};

RequestDetailsTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  table: PropTypes.any,
  confirm: PropTypes.object,
};

export default RequestDetailsTableRow;
