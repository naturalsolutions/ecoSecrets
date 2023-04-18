import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from "react-i18next";
import DialogYesNo from './dialogYesNo';

export default function AlertDialog(props) {
    const { t } = useTranslation();

    return (
        <div >
            <Dialog
                open={props.openDialogModal}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.description}
                    </DialogContentText>
                </DialogContent>
                <DialogYesNo onYes={ props.save } onNo={ props.quit }/>
            </Dialog>
        </div>
    );
}