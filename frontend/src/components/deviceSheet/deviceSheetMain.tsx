import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Alert, Stack, Typography} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Grid} from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import DeviceForm from './deviceForm';
import DeviceModal from '../deviceMenu/deviceModal';
import DeviceData from './deviceData';


const DeviceSheet = () => {
    const {device, setCurrentDevice} = useMainContext();
    
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
                <DeviceData/>
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
                <Alert severity="info">Fonctionnalité pas encore disponible.</Alert>
            </Stack>
            <div></div>
                
        </Stack> ) : <div>Pas de fiche pour ce dispositif</div>
    );
};
export default DeviceSheet;
