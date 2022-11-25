
import { AppBar, Box, Grid, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useEffect, useState } from "react";
import DeploymentForm from "./deploymentForm";
import ImageList from "./imageList";
import TabPanel from "./tabPanel";
import { useMainContext } from "../contexts/mainContext";
import ImportModale from "./importModale";
import DeploymentCreationModale from "./deploymentCreationModale";
import { useTranslation } from "react-i18next";
import { capitalize } from "@mui/material";

const DeploymentDetails = (props) => {
    const { t } = useTranslation()
    const { deploymentData } = useMainContext();
    const [tabValue, setTabValue] = useState(props.number);
    const handleTabValueChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const [openNewDeployment, setOpenNewDeployment] = useState(false);
    const handleOpenNewDeployment = () => {
        setOpenNewDeployment(true);
    };
    const handleCloseNewDeployment = () => {
        setOpenNewDeployment(false);
    };

    const [openImport, setOpenImport] = useState(false);
    const openImportModale = () => {
        setOpenImport(true);
    };
    const closeImportModale = () => {
        setOpenImport(false);
    };
    
    return(
        <Box sx={{ width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar variant="dense">
                    <Grid
                        container
                    >
                        <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                            { deploymentData && deploymentData.name }
                        </Typography>
                        
                    </Grid>
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}
                        onClick={handleOpenNewDeployment}
                        >
                            <AddCircleIcon />
                        </IconButton>
                        <DeploymentCreationModale 
                            openNewDeployment={openNewDeployment}
                            handleCloseNewDeployment={handleCloseNewDeployment}
                        />

                        <IconButton 
                            onClick={openImportModale}
                            aria-label="menu" 
                            sx={{ mr: 2 }}
                        >
                            <CloudDownloadIcon />
                        </IconButton>
                        <ImportModale 
                            open={openImport} 
                            close={closeImportModale}
                            projectIsSet={true}
                            deploymentIsSet={true}
                        />
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabValueChange} 
                    aria-label="deployment tab"
                    variant='fullWidth'
                >
                <Tab label= {capitalize(t('main.details'))} />
                <Tab label={capitalize(t('main.medias'))} />
                </Tabs>
            </Box>
            <TabPanel valueTab={tabValue} index={0}>
                <DeploymentForm/>
            </TabPanel>
            <TabPanel valueTab={tabValue} index={1}>
                <ImageList/>
            </TabPanel>
        </Box>
        
        // 
    )
};
export default DeploymentDetails;