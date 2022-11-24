import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";

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
                <Button
                    onClick={props.handleCloseSaveErrorDialog}
                    color="secondary"
                >
                    { capitalize(t("annotations.fix_my_data")) }
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AnnotationSaveError;