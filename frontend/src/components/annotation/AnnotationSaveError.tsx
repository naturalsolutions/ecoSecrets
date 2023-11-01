import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonCancel from "../common/buttonCancel";

const AnnotationSaveError = (props) => {
    const { t } = useTranslation()
    return (
        <Dialog open={props.openSaveErrorDialog}>
            <DialogTitle>
                { capitalize(t("annotations.cannot_save")) }
            </DialogTitle>

            <DialogContent>
                <Typography component={"span"} >
                    { capitalize(t("annotations.cannot_save_species")) }
                </Typography>
            </DialogContent>

            <DialogActions>
                <ButtonCancel content={ capitalize(t("annotations.fix_my_data")) } cancel={ props.handleCloseSaveErrorDialog } />
            </DialogActions>
        </Dialog>
    )
};

export default AnnotationSaveError;