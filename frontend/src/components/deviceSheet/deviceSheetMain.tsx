import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Alert, Stack, Typography, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import DeviceForm from './deviceForm';
import DeviceModal from '../deviceMenu/deviceModal';
import DeviceData from './deviceData';
import { useTranslation } from "react-i18next";
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';
import { DeploymentForDeviceSheet, DeploymentsService } from '../../client';

const DeviceSheet = () => {
    const { device, setCurrentDevice } = useMainContext();
    const { t } = useTranslation();
    const [historyDeployment, setHistoryDeployment] = useState<DeploymentForDeviceSheet[]>([]);

    let params = useParams();
    useEffect(() => {
        (async () => {
            setCurrentDevice(Number(params.deviceId));
            if (params.deviceId !== undefined) {
                DeploymentsService
                    .readDeviceDeploymentsDeploymentsDeviceDeviceIdGet(parseInt(params.deviceId))
                    .then(response => {
                        setHistoryDeployment(response)
                    });
            }
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
                            <DeviceModal />
                            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: { color: "#2FA37C" } }}>
                                <CloudDownloadIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Stack
                    spacing={2}
                    justifyContent="center"
                >
                    <DeviceData />
                    <Typography variant="h4" color="#000000" component="div">
                        {capitalize(t("devices.sheet"))}
                    </Typography>
                </Stack>

                < DeviceForm />
                <Stack
                    spacing={2}
                    justifyContent="center"
                >
                    <Typography variant="h4" color="#000000" component="div">
                        {capitalize(t("devices.history"))}
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Localisation</b></TableCell>
                                    <TableCell><b>Projet</b></TableCell>
                                    <TableCell><b>Site</b></TableCell>
                                    <TableCell><b>Déploiement</b></TableCell>
                                    <TableCell><b>Nb de médias</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historyDeployment.map(item => {
                                    console.log(item); // Déplacez cette ligne en dehors du contexte du rendu JSX si nécessaire
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell></TableCell>
                                            <TableCell>{item.project_name}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <div></div>

            </Stack>) : <div>{capitalize(t("devices.warning"))}</div>
    );
};
export default DeviceSheet;
