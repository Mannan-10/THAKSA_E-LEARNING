import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function ConfirmDialog({
  open,
  title = "Please confirm",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  onConfirm,
  onClose,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>
      {description ? (
        <DialogContent>
          <Typography color="text.secondary">{description}</Typography>
        </DialogContent>
      ) : null}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button variant="contained" color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

