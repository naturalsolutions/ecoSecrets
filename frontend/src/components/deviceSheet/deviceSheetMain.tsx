import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Alert, Stack, Typography, capitalize} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Grid} from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import DeviceForm from './deviceForm';
import DeviceModal from '../deviceMenu/deviceModal';
import DeviceData from './deviceData';
import { useTranslation } from "react-i18next";

const DeviceSheet = () => {
    const {device, setCurrentDevice} = useMainContext();
    const { t } = useTranslation();

    let params = useParams();
    useEffect(() => {
        (async () => {
            setCurrentDevice(Number(params.deviceId));
        })();
    }, []);

    return (
        device() !== undefined ? (
        <Stack 
            direction="column"
            spacing={3}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar variant="dense">
                    <Grid
                        container
                    >
                        <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                            {device().name}
                        </Typography>
                        
                    </Grid>
                        <DeviceModal/>
                    </Toolbar>
                </AppBar>
            </Box>

            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <DeviceData/>
                <Typography variant="h4" color="#000000" component="div">
                {capitalize(t("devices.sheet"))}
                </Typography>
            </Stack>

            < DeviceForm/>
            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Typography variant="h4" color="#000000" component="div">
                    { capitalize(t("devices.history")) }
                </Typography>
                <Alert severity="info">{capitalize(t("main.unavailable"))}</Alert>
            </Stack>
            <div></div>
                
        </Stack> ) : <div>{capitalize(t("devices.warning"))}</div>
    );
};
export default DeviceSheet;
