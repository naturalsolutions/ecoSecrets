import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from "react-i18next";
import ButtonCancel from './buttonCancel';
import ButtonValidate from './buttonValidate';

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
                <DialogActions>
                    <ButtonCancel content={ t('main.no') } cancel={ props.quit } />
                    <ButtonValidate content={ t('main.yes') } validate={ props.save } />
                </DialogActions>
            </Dialog>
        </div>
    );
}