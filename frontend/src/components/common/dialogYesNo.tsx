import { DialogActions } from "@mui/material";
import ButtonsYesNo from "./buttonsYesNo";

export default function DialogYesNo({ onYes, onNo }) {
    return (
        <DialogActions>
            <ButtonsYesNo onYes={ onYes } onNo={ onNo }/>
        </DialogActions>
    )
}