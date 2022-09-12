import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Stack, Typography, Button, Dialog, DialogTitle, Divider, DialogContent, DialogActions} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import DeviceForm from './deviceForm';
import DeviceModal from '../deviceMenu/deviceModal';


const DeviceSheet = () => {
    const {device, setCurrentDevice} = useMainContext();
    
    let params = useParams();
    useEffect(() => {
        (async () => {
            console.log(params)
        setCurrentDevice(Number(params.deviceId));
        })();
    }, []);

    console.log('mondevice')
    console.log(device())

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
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <CloudDownloadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Typography variant="h4" color="#000000" component="div">
                    Fiche dispositif
                </Typography>
            </Stack>

            < DeviceForm/>
            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Typography variant="h4" color="#000000" component="div">
                    Historique des déploiements
                </Typography>
            </Stack>
            <div></div>
                
        </Stack> ) : <div>test</div>
    );
};
export default DeviceSheet;
