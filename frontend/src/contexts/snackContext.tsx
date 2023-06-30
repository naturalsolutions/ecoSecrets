import { VerticalAlignBottom } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import React, { createContext, FC, useContext, useState } from "react";
import { Snack } from "../components/common/snack";


export interface SnackContextProps {
    name?: string;
    children?: any;
}


export const SnackContext = createContext({} as any);

export const useSnackContext = () => useContext(SnackContext);


const SnackContextProvider: FC<SnackContextProps> = ({ children }) => {

    const [snack, setSnack] = useState(new Snack({ open: false }));

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnack(new Snack({ color: snack.color, open: false, anchorOrigin: snack.anchorOrigin }));
    };
    return (
        <SnackContext.Provider
            value={{
                snack,
                setSnack
            }}
        >
            <Snackbar open={snack.open} autoHideDuration={snack.autoHideDuration} onClose={handleClose} anchorOrigin={snack.anchorOrigin}>
                <Alert severity={snack.color} sx={{ width: '100%' }}>
                    {snack.message || ''}
                </Alert>
            </Snackbar>
            {children}
        </SnackContext.Provider>
    );
}
export default SnackContextProvider;