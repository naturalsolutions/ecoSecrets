import { AlertColor, SnackbarProps } from "@mui/material";

class Snack {
    message?: string;
    color?: AlertColor;
    autoHideDuration?: number;
    open: boolean;
    anchorOrigin?: SnackbarProps["anchorOrigin"];

    constructor(data: Snack) {
        this.message = data.message || '';
        this.color = data.color || 'info';
        this.autoHideDuration = data.autoHideDuration || 3000;
        this.open = data.open;
        this.anchorOrigin = data.anchorOrigin || { vertical: "top", horizontal: "right" };
    }
}

export { Snack };