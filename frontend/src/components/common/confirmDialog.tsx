import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { SvgIconComponent } from "@mui/icons-material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  icon: SvgIconComponent;
  iconColor?: string;
  color?:
    | "inherit"
    | "secondary"
    | "primary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir effectuer cette action ?",
  icon: Icon,
  color = "inherit",
  iconColor = "inherit",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ typography: "h6" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Icône et titre */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
          >
            <Icon sx={{ mr: 1, color: iconColor }} />
            {title}
          </Box>
          {/* Bouton de fermeture */}
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          {t("main.cancel")}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={color}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
