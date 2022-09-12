import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const AnnotationSaveError = (props) => {
    return(
        <Dialog open={props.openSaveErrorDialog}>
            <DialogTitle>
                Enregistrement des annotations impossible pour cette image
            </DialogTitle>

            <DialogContent>
                <Typography>
                    Vous ne pouvez pas sauvegarder : toutes les observations doivent à minima renseigner une espèce et le nombre d'individus associé. S'il vous plaît, corriger les informations.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={props.handleCloseSaveErrorDialog}
                    color="secondary"
                >
                    Je corrige mes données
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default AnnotationSaveError;