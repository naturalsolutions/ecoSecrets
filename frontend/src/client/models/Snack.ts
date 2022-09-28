import { AlertColor, SnackbarContentProps, SnackbarProps } from "@mui/material";


class Snack {
    message?: string;
    color?: AlertColor;
    autoHideDuration?: number;
    open: boolean;
    // Ypos?: string;
    // Xpos?: string;
    anchorOrigin?: SnackbarProps["anchorOrigin"];

    constructor(data: Snack) {
        this.message = data.message || '';
        this.color = data.color || 'info';
        this.autoHideDuration = data.autoHideDuration || 3000;
        this.open = data.open;
        // this.Ypos=data.Ypos || "top";
        // this.Xpos=data.Xpos || "right";
        this.anchorOrigin = data.anchorOrigin || { vertical: "top", horizontal: "right" };
    }

}


export { Snack };

