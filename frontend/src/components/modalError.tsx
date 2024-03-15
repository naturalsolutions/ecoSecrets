import { capitalize, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useTranslation } from "react-i18next";
import ButtonCancel from "./common/buttonCancel";

const ModalError = (props) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.open) {
            setOpen(true)
        }
    }, [props.open])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <DialogTitle>
                    <Typography variant="h6">
                        {capitalize(t('main.sorry'))}
                    </Typography>
                </DialogTitle>
                <IconButton onClick={handleClose} >
                    <ClearTwoToneIcon />
                </IconButton>
            </Stack>
            <Divider />
            <DialogContent>
                <Typography>
                    {capitalize(t('main.unavailable'))}
                </Typography>
            </DialogContent>
            <Divider />
            <DialogActions>
                <ButtonCancel content={ capitalize(t('main.close')) } cancel={ handleClose } />
            </DialogActions>
        </Dialog>
    )

}

export default ModalError;