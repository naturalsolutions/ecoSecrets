import {
    capitalize,
    IconButton,
    Tooltip,
  } from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../common/confirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useState } from "react";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useFilesContext } from "../../contexts/filesContext";
import { FilesService } from "../../client";

const ButtonDeleteMedia = () => {
    const { t } = useTranslation();

    const { next } = useAnnotationContext();
    const { currentImage, updateListFile, paginationFiles,imagePerPage } = useFilesContext();

    const [open, setOpen] = useState(false);

    const save = () => {
      FilesService.deleteFileFilesDeleteFileIdDelete(currentImage).then((res) => {
        updateListFile((paginationFiles.currentPage -1) *imagePerPage);
        setOpen(false);
        next();
      }).catch((err) => console.error("Erreur:", err));
    };
    
    return(
        <>
            <Tooltip title={capitalize(t("annotations.delete"))} arrow>
                <IconButton
                    aria-label="reset"
                    size="large"
                    color="secondary"
                    sx={{
                        border: "1px solid",
                        borderColor: "secondary",
                        borderRadius: "5px",
                        padding: "8px",
                    }}
                    onClick={() => setOpen(true)}
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <ConfirmDialog
                open={open}
                title={capitalize(t("annotations.delete"))}
                message={capitalize(t("annotations.delete_desc"))}
                icon={WarningIcon}
                iconColor="warning.main"
                color="warning"
                onClose={() => setOpen(false)}
                onConfirm={() => {
                    save();
                }}
            />
        </>
    )
};

export default ButtonDeleteMedia;
